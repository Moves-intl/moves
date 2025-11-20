import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserPlus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StaffForm, { StaffFormData } from "./StaffForm";

interface StaffMember {
  id: string;
  name: string;
  designation: string;
  description?: string;
  email?: string;
  phone?: string;
  profile_image_url?: string;
  social_media_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const StaffManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch staff members
  const { data: staffMembers, isLoading } = useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as StaffMember[];
    },
  });

  // Add staff member
  const addStaffMutation = useMutation({
    mutationFn: async (data: StaffFormData) => {
      const { linkedin, twitter, facebook, ...staffData } = data;
      const social_media_links = {
        ...(linkedin && { linkedin }),
        ...(twitter && { twitter }),
        ...(facebook && { facebook }),
      };

      const insertData = {
        name: data.name,
        designation: data.designation,
        description: data.description || null,
        email: data.email || null,
        phone: data.phone || null,
        profile_image_url: data.profile_image_url || null,
        display_order: data.display_order,
        social_media_links,
      };

      const { error } = await supabase.from("staff_members").insert(insertData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      toast({
        title: "Success",
        description: "Staff member added successfully",
      });
      setIsFormOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add staff member",
        variant: "destructive",
      });
    },
  });

  // Update staff member
  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: StaffFormData }) => {
      const { linkedin, twitter, facebook, ...staffData } = data;
      const social_media_links = {
        ...(linkedin && { linkedin }),
        ...(twitter && { twitter }),
        ...(facebook && { facebook }),
      };

      const updateData = {
        name: data.name,
        designation: data.designation,
        description: data.description || null,
        email: data.email || null,
        phone: data.phone || null,
        profile_image_url: data.profile_image_url || null,
        display_order: data.display_order,
        social_media_links,
      };

      const { error } = await supabase
        .from("staff_members")
        .update(updateData)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });
      setIsFormOpen(false);
      setEditingStaff(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update staff member",
        variant: "destructive",
      });
    },
  });

  // Delete staff member
  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("staff_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete staff member",
        variant: "destructive",
      });
    },
  });

  const handleAddStaff = () => {
    setEditingStaff(null);
    setIsFormOpen(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: StaffFormData) => {
    if (editingStaff) {
      updateStaffMutation.mutate({ id: editingStaff.id, data });
    } else {
      addStaffMutation.mutate(data);
    }
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      deleteStaffMutation.mutate(id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={handleAddStaff}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name & Designation</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Social Media</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers?.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={staff.profile_image_url || ""}
                          alt={staff.name}
                        />
                        <AvatarFallback>
                          {getInitials(staff.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {staff.designation}
                        </div>
                        {staff.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {staff.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {staff.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {staff.email}
                          </div>
                        )}
                        {staff.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {staff.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {staff.social_media_links?.linkedin && (
                          <a
                            href={staff.social_media_links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {staff.social_media_links?.twitter && (
                          <a
                            href={staff.social_media_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {staff.social_media_links?.facebook && (
                          <a
                            href={staff.social_media_links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={staff.is_active ? "default" : "secondary"}
                      >
                        {staff.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(`/staff/${staff.id}`, "_blank")
                          }
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStaff(staff)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStaff(staff.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <StaffForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStaff(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={
          editingStaff
            ? {
                name: editingStaff.name,
                designation: editingStaff.designation,
                description: editingStaff.description || "",
                email: editingStaff.email || "",
                phone: editingStaff.phone || "",
                profile_image_url: editingStaff.profile_image_url || "",
                linkedin: editingStaff.social_media_links?.linkedin || "",
                twitter: editingStaff.social_media_links?.twitter || "",
                facebook: editingStaff.social_media_links?.facebook || "",
                display_order: editingStaff.display_order,
              }
            : undefined
        }
        isLoading={addStaffMutation.isPending || updateStaffMutation.isPending}
      />
    </div>
  );
};

export default StaffManagement;
