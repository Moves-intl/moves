import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CareerFormData {
  job_title: string;
  job_type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  location: string;
  department: string;
  short_description: string;
  full_description: string;
  requirements: string;
  benefits: string;
  apply_link: string;
  application_deadline: string;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
}

const generateSlug = (text: string) => 
  text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const CareerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPublished, setIsPublished] = useState(false);

  const isEditing = Boolean(id && id !== 'new');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CareerFormData>({
    defaultValues: {
      job_title: '',
      job_type: 'Full-Time',
      location: '',
      department: '',
      short_description: '',
      full_description: '',
      requirements: '',
      benefits: '',
      apply_link: '',
      application_deadline: '',
      is_published: false,
      meta_title: '',
      meta_description: ''
    }
  });

  const { data: career, isLoading } = useQuery({
    queryKey: ['admin-career', id],
    queryFn: async () => {
      if (!isEditing) return null;
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing
  });

  useEffect(() => {
    if (career) {
      setValue('job_title', career.job_title);
      setValue('job_type', career.job_type);
      setValue('location', career.location);
      setValue('department', career.department);
      setValue('short_description', career.short_description);
      setValue('full_description', career.full_description);
      setValue('requirements', career.requirements);
      setValue('benefits', career.benefits || '');
      setValue('apply_link', career.apply_link);
      setValue('application_deadline', career.application_deadline ? 
        new Date(career.application_deadline).toISOString().slice(0, 16) : '');
      setValue('is_published', career.is_published);
      setValue('meta_title', career.meta_title || '');
      setValue('meta_description', career.meta_description || '');
      setIsPublished(career.is_published);
    }
  }, [career, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (data: CareerFormData) => {
      const careerData = {
        job_title: data.job_title,
        slug: generateSlug(data.job_title),
        job_type: data.job_type,
        location: data.location,
        department: data.department,
        short_description: data.short_description,
        full_description: data.full_description,
        requirements: data.requirements,
        benefits: data.benefits || null,
        apply_link: data.apply_link,
        application_deadline: data.application_deadline ? new Date(data.application_deadline).toISOString() : null,
        is_published: isPublished,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null
      };

      if (isEditing) {
        const { error } = await supabase
          .from('careers')
          .update(careerData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('careers')
          .insert(careerData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ 
        title: isEditing ? 'Career updated successfully' : 'Career created successfully' 
      });
      navigate('/admin/careers');
    },
    onError: (error) => {
      toast({ 
        title: isEditing ? 'Error updating career' : 'Error creating career', 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  });

  const onSubmit = (data: CareerFormData) => {
    saveMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/careers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Career' : 'Create New Career'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="published">Published:</Label>
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={saveMutation.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Saving...' : 'Save Career'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  {...register('job_title', { required: 'Job title is required' })}
                />
                {errors.job_title && (
                  <p className="text-sm text-red-600">{errors.job_title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="job_type">Job Type *</Label>
                <Select value={watch('job_type')} onValueChange={(value: any) => setValue('job_type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Melbourne, Sydney, Remote"
                  {...register('location', { required: 'Location is required' })}
                />
                {errors.location && (
                  <p className="text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  placeholder="e.g., Admissions, Migration, Marketing"
                  {...register('department', { required: 'Department is required' })}
                />
                {errors.department && (
                  <p className="text-sm text-red-600">{errors.department.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description *</Label>
              <Textarea
                id="short_description"
                rows={3}
                placeholder="Brief summary of the role"
                {...register('short_description', { required: 'Short description is required' })}
              />
              {errors.short_description && (
                <p className="text-sm text-red-600">{errors.short_description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="full_description">Full Description *</Label>
              <Textarea
                id="full_description"
                rows={6}
                placeholder="Detailed job description and responsibilities"
                {...register('full_description', { required: 'Full description is required' })}
              />
              {errors.full_description && (
                <p className="text-sm text-red-600">{errors.full_description.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="requirements">Requirements *</Label>
              <Textarea
                id="requirements"
                rows={6}
                placeholder="Skills, experience, and qualifications required"
                {...register('requirements', { required: 'Requirements are required' })}
              />
              {errors.requirements && (
                <p className="text-sm text-red-600">{errors.requirements.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea
                id="benefits"
                rows={4}
                placeholder="Benefits and perks offered"
                {...register('benefits')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apply_link">Application Link *</Label>
              <Input
                id="apply_link"
                type="url"
                placeholder="Link to application form or email"
                {...register('apply_link', { required: 'Application link is required' })}
              />
              {errors.apply_link && (
                <p className="text-sm text-red-600">{errors.apply_link.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="application_deadline">Application Deadline</Label>
              <Input
                id="application_deadline"
                type="datetime-local"
                {...register('application_deadline')}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                placeholder="SEO title for search engines"
                {...register('meta_title')}
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                rows={3}
                placeholder="SEO description for search engines"
                {...register('meta_description')}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CareerForm;