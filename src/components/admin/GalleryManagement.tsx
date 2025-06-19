import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { uploadGalleryImage } from '@/services/gallery.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const galleryFormSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  category: z.string().min(1, 'Категория обязательна'),
  type: z.enum(['visualization', 'photo']),
  coating: z.enum(['oak', 'walnut', 'rosewood', 'other']),
  has_storage: z.boolean(),
  is_lift: z.boolean(),
  image: z.instanceof(FileList).refine(files => files?.length > 0, 'Изображение обязательно'),
});

type GalleryFormValues = z.infer<typeof galleryFormSchema>;

export function GalleryManagement() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: '',
      category: '',
      has_storage: false,
      is_lift: false,
      type: 'visualization',
      coating: 'oak',
    },
  });

  const onSubmit = async (data: GalleryFormValues) => {
    setIsSubmitting(true);
    try {
      const file = data.image?.[0];
      if (!file) {
        throw new Error('Файл не выбран');
      }
      
      const payload = {
        imageFile: file,
        title: data.title,
        category: data.category,
        type: data.type,
        coating: data.coating,
        has_storage: data.has_storage,
        is_lift: data.is_lift,
      };

      await uploadGalleryImage(payload);

      toast({
        title: 'Успех!',
        description: 'Изображение успешно загружено в галерею.',
      });
      reset();
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: 'Ошибка',
        description: `Не удалось загрузить изображение: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление галереей</CardTitle>
        <CardDescription>Загрузите новые изображения и укажите их параметры.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input id="category" {...register('category')} placeholder="Например, Столы, Стулья..." />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type-select">Тип</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="type-select">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visualization">Визуализация</SelectItem>
                      <SelectItem value="photo">Фото</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coating-select">Покрытие</Label>
              <Controller
                name="coating"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="coating-select">
                      <SelectValue placeholder="Выберите покрытие" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oak">Дуб</SelectItem>
                      <SelectItem value="walnut">Орех</SelectItem>
                      <SelectItem value="rosewood">Палисандр</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <Controller
                name="is_lift"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Switch id="is_lift" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="is_lift">Подъемный стол?</Label>
                    </div>
                )}
            />
            <Controller
                name="has_storage"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Switch id="has_storage" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="has_storage">Есть тумба?</Label>
                    </div>
                )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Изображение</Label>
            <Input id="image" type="file" {...register('image')} />
            {errors.image && <p className="text-red-500 text-sm">{typeof errors.image.message === 'string' ? errors.image.message : 'Ошибка файла'}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Загрузка...' : 'Загрузить изображение'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
