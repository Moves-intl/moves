import React, { useRef } from 'react'; // 1. Added useRef import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
import MediaSelector from '@/components/admin/MediaSelector';

interface FeaturedImageSectionProps {
  formData: {
    featured_image_url: string;
    featured_image_alt: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FeaturedImageSection: React.FC<FeaturedImageSectionProps> = ({
  formData,
  onChange,
  onImageFileChange,
}) => {
  const mediaLibraryRef = useRef<HTMLDivElement>(null);

  // Logic to trigger the Media Library browse button
  const handleLibraryClick = () => {
    const browseButton = mediaLibraryRef.current?.querySelector('button');
    if (browseButton) {
      browseButton.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Image Selection</Label>
          <div className="mt-2 flex items-center gap-4">
            {/* THIS BUTTON OPENS MEDIA LIBRARY */}
            <Button
              type="button"
              variant="outline"
              onClick={handleLibraryClick}
              className="flex items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              Choose Image
            </Button>

            {/* THIS BUTTON OPENS LOCAL COMPUTER FILES */}
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={onImageFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Preview Section */}
        {formData.featured_image_url && (
          <div className="space-y-2">
            <img
              src={formData.featured_image_url}
              alt="Featured image preview"
              className="w-48 h-32 object-cover rounded-md border"
            />
            <div>
              <Label htmlFor="featured_image_alt">Alt Text</Label>
              <Input
                id="featured_image_alt"
                name="featured_image_alt"
                value={formData.featured_image_alt}
                onChange={onChange}
                placeholder="Describe the image for accessibility"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/*  WRAP THE SELECTOR IN THE REF */}
        <div ref={mediaLibraryRef}>
          <MediaSelector
            value={formData.featured_image_url}
            onChange={(value) => {
              const event = {
                target: { name: 'featured_image_url', value }
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
            }}
            label="Or browse media library"
            placeholder="Select from media library"
            accept="image/*"
          />
        </div>

        <div>
          <Label htmlFor="featured_image_url">Or paste image URL</Label>
          <Input
            id="featured_image_url"
            name="featured_image_url"
            type="url"
            value={formData.featured_image_url}
            onChange={onChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};