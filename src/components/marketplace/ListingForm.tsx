import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/ui/button';
import {
  createMarketplaceListing,
  uploadListingImage,
} from '@/services/marketplace.service';
import { useToast } from '@/hooks/use-toast';

// Validation schema
const listingSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.number().min(0),
  condition: z.enum(['new', 'used', 'exhibition']),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Загрузите хотя бы одно изображение'),
});

type ListingFormValues = z.infer<typeof listingSchema>;

interface ListingFormProps {
  onCreated?: () => void;
}

export const ListingForm: React.FC<ListingFormProps> = ({ onCreated }) => {
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (values: ListingFormValues) => {
    try {
      setUploading(true);

      // Upload all images sequentially
      const files = Array.from(values.images);
      const uploadedUrls: string[] = [];
      for (const f of files) {
        const url = await uploadListingImage(f);
        uploadedUrls.push(url);
      }

      await createMarketplaceListing({
        title: values.title,
        description: values.description,
        price: values.price,
        condition: values.condition,
        images: uploadedUrls,
        seller: 'self', // backend should overwrite with auth user
      });

      toast({
        title: 'Объявление создано',
        description: 'Ваше объявление успешно опубликовано на бирже.',
      });

      reset();
      onCreated?.();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать объявление. Попробуйте ещё раз.',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="SmartDesk Pro 140×70" {...register('title')} />
              </FormControl>
              <FormMessage>
                {errors.title && <span>{errors.title.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Подробно опишите состояние и особенности..."
                  {...register('description')}
                />
              </FormControl>
              <FormMessage>
                {errors.description && <span>{errors.description.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          name="price"
          render={() => (
            <FormItem>
              <FormLabel>Цена, ₽</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={100}
                  {...register('price', { valueAsNumber: true })}
                />
              </FormControl>
              <FormMessage>
                {errors.price && <span>{errors.price.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Condition */}
        <FormField
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Состояние</FormLabel>
              <FormControl>
                <select
                  className="border rounded-md px-3 py-2 text-sm w-full"
                  {...register('condition')}
                >
                  <option value="new">Новый</option>
                  <option value="used">Б/у</option>
                  <option value="exhibition">Выставочный образец</option>
                </select>
              </FormControl>
              <FormMessage>
                {errors.condition && <span>{errors.condition.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Images */}
        <FormField
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Фото товара</FormLabel>
              <FormControl>
                <Input type="file" multiple accept="image/*" {...register('images')} />
              </FormControl>
              <FormMessage>
                {errors.images && <span>{errors.images.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting || uploading}>
          {uploading ? 'Загрузка...' : 'Опубликовать'}
        </Button>
      </form>
    </Form>
  );
}; 