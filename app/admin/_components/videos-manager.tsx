"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ExternalLink, Video } from "lucide-react";
import { YouTubeVideo } from "@/lib/types";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils";
import Image from "next/image";

export default function VideosManager() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos");
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate YouTube URL
    const videoId = getYouTubeId(formData.url);
    if (!videoId) {
      setMessage({
        type: "error",
        text: "URL do YouTube inválida. Use um link válido do YouTube.",
      });
      return;
    }

    try {
      const url = editingVideo
        ? `/api/admin/videos/${editingVideo.id}`
        : "/api/admin/videos";

      const method = editingVideo ? "PUT" : "POST";

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
          text: editingVideo
            ? "Vídeo atualizado com sucesso!"
            : "Vídeo adicionado com sucesso!",
        });
        setIsDialogOpen(false);
        setEditingVideo(null);
        resetForm();
        fetchVideos();
      } else {
        throw new Error("Erro na resposta da API");
      }
    } catch (error) {
      console.error("Erro ao salvar vídeo:", error);
      setMessage({
        type: "error",
        text: "Erro ao salvar vídeo. Tente novamente.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este vídeo?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Vídeo excluído com sucesso!",
        });
        fetchVideos();
      } else {
        throw new Error("Erro ao excluir vídeo");
      }
    } catch (error) {
      console.error("Erro ao excluir vídeo:", error);
      setMessage({
        type: "error",
        text: "Erro ao excluir vídeo. Tente novamente.",
      });
    }
  };

  const handleEdit = (video: YouTubeVideo) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      url: video.url,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVideo(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-32 bg-gray-200 rounded" />
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
            Gerenciar Vídeos
          </h2>
          <p className="text-gray-600">
            Adicione, edite ou remova vídeos do YouTube
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? "Editar Vídeo" : "Adicionar Vídeo"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Vídeo *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="Ex: Você é um sonhador ou um realizador?"
                />
              </div>

              <div>
                <Label htmlFor="url">URL do YouTube *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                  placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                />
                <p className="text-xs text-gray-600 mt-1">
                  Cole o link completo do YouTube (funciona com videos normais,
                  shorts, etc.)
                </p>
              </div>

              {/* Preview */}
              {formData.url && getYouTubeId(formData.url) && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="relative w-full h-32 bg-black rounded overflow-hidden">
                    <Image
                      src={getYouTubeThumbnail(formData.url)}
                      alt="Preview do vídeo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {editingVideo ? "Atualizar" : "Adicionar"} Vídeo
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

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const thumbnailUrl = getYouTubeThumbnail(video.url);
          return (
            <Card key={video.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge className="bg-red-50 text-red-600 border-red-200 mb-2">
                    <Video className="w-3 h-3 mr-1" />
                    YouTube
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(video)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(video.id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {video.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden mb-4">
                  <Image
                    src={thumbnailUrl}
                    alt={`Thumbnail: ${video.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline text-sm flex items-center gap-1"
                  >
                    Ver no YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Badge variant="outline" className="text-xs">
                    {video.url.includes("/shorts/") ? "Short" : "Vídeo"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {videos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Nenhum vídeo cadastrado ainda</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Vídeo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
