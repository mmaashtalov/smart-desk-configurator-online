import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Оформление заказа
          </h1>
          <p className="font-roboto text-gray-700 text-lg mb-8">
            Благодарим за ваш заказ! Ваш заказ успешно принят.
          </p>
          <img 
            src="https://via.placeholder.com/150/22C55E/FFFFFF?text=Order+Confirmed" 
            alt="Order Confirmed" 
            className="mx-auto mb-8 rounded-lg shadow-md"
          />
          <p className="font-roboto text-gray-600 mb-8">
            В ближайшее время с вами свяжется менеджер для уточнения деталей.
          </p>
          <Link to="/">
            <Button variant="default">Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage; 