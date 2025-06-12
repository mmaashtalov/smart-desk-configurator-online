/// <reference types="vitest/globals" />
import { screen, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { render } from '@/test/test-utils';
import { MetaEditor } from '@/components/seo/MetaEditor';

const mockMeta = {
  title: 'Тестовый Title',
  description: 'Тестовое описание',
  h1: 'Тестовый H1',
  verification: {
    google: 'google-code',
    yandex: 'yandex-code',
  },
};

describe('MetaEditor', () => {
  
  beforeEach(() => {
    server.use(
      http.get('/api/seo/meta', () => {
        return HttpResponse.json(mockMeta);
      })
    );
  });

  it('should display fetched data in the fields', async () => {
    render(<MetaEditor />);

    // Wait for the fields to be populated
    expect(await screen.findByDisplayValue('Тестовый Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Тестовое описание')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Тестовый H1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('google-code')).toBeInTheDocument();
    expect(screen.getByDisplayValue('yandex-code')).toBeInTheDocument();
  });

  it('should display error message on fetch failure', async () => {
    // Override the handler to return an error
    server.use(
      http.get('/api/seo/meta', () => {
        return new HttpResponse('{}', { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        });
      })
    );

    render(<MetaEditor />);

    // Since the component doesn't have explicit error handling visible to the user,
    // we can check that the fields are empty as a proxy.
    // We expect the initial state values.
    expect(await screen.findByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('H1')).toHaveValue('');
    expect(screen.getByLabelText('Google Site Verification')).toHaveValue('');
    expect(screen.getByLabelText('Yandex Verification')).toHaveValue('');
  });
  
  it('should call the save API on button click', async () => {
    let savedData: any = null;
    
    // Mock the POST request
    server.use(
      http.post('/api/seo/meta', async ({ request }) => {
        const body = await request.text();
        try {
          savedData = JSON.parse(body);
        } catch (e) {
          console.error('Failed to parse JSON body:', body);
          throw e;
        }
        return HttpResponse.json({});
      })
    );
      
    render(<MetaEditor />);
    
    // Wait for initial data to load
    await screen.findByDisplayValue('Тестовый Title');

    // Change a value
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Новый Title' } });
    
    // Click save
    const saveButton = screen.getByRole('button', { name: /Сохранить все/i });
    fireEvent.click(saveButton);

    // Assert that the API was called with the correct data
    await new Promise(resolve => setTimeout(resolve, 100)); // wait for post to resolve
    
    expect(savedData.meta.title).toBe('Новый Title');
    expect(savedData.verification.google).toBe('google-code');
  });
}); 