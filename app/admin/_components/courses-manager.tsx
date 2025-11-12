"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ExternalLink, BookOpen } from "lucide-react";
import { CourseItem } from "@/lib/types";

export default function CoursesManager() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    image: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const url = editingCourse
        ? `/api/admin/courses/${editingCourse.id}`
        : "/api/admin/courses";

      const method = editingCourse ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: editingCourse
            ? "Curso atualizado com sucesso!"
            : "Curso criado com sucesso!",
        });
        setIsDialogOpen(false);
        setEditingCourse(null);
        resetForm();
        fetchCourses();
      } else {
        throw new Error("Erro na resposta da API");
      }
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      setMessage({
        type: "error",
        text: "Erro ao salvar curso. Tente novamente.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este curso?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Curso excluído com sucesso!",
        });
        fetchCourses();
      } else {
        throw new Error("Erro ao excluir curso");
      }
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      setMessage({
        type: "error",
        text: "Erro ao excluir curso. Tente novamente.",
      });
    }
  };

  const handleEdit = (course: CourseItem) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      link: course.link,
      image: course.image || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      link: "",
      image: "",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCourse(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-20 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy mb-2">
            Gerenciar Cursos
          </h2>
          <p className="text-gray-600">
            Adicione, edite ou remova cursos do carrossel
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Editar Curso" : "Adicionar Curso"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Curso *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Ex: Método CIS"
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  placeholder="Descrição detalhada do curso..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="link">Link do Curso *</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  required
                  placeholder="https://febracis.com/curso/..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  {editingCourse ? "Atualizar" : "Criar"} Curso
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages */}
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge className="bg-teal/10 text-teal mb-2">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Curso
                </Badge>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(course.id!)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {course.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline text-sm flex items-center gap-1"
                >
                  Ver Curso
                  <ExternalLink className="w-3 h-3" />
                </a>
                {course.image && (
                  <Badge variant="outline" className="text-xs">
                    Com Imagem
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Nenhum curso cadastrado ainda</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-navy hover:bg-navy/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Curso
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
