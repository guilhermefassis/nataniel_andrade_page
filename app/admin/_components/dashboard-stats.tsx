"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, MessageSquare, TrendingUp } from "lucide-react";

interface Stats {
  totalCourses: number;
  totalVideos: number;
  totalMessages: number;
  pendingMessages: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total de Cursos",
      value: stats?.totalCourses ?? 0,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Vídeos do YouTube",
      value: stats?.totalVideos,
      icon: Video,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Total de Mensagens",
      value: stats?.totalMessages,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Mensagens Pendentes",
      value: stats?.pendingMessages,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral das estatísticas do site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-navy mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <a
                href="/admin?tab=courses"
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-navy">Gerenciar Cursos</div>
                <div className="text-sm text-gray-600">
                  Adicionar ou editar cursos
                </div>
              </a>
              <a
                href="/admin?tab=videos"
                className="block p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-navy">Gerenciar Vídeos</div>
                <div className="text-sm text-gray-600">
                  Adicionar vídeos do YouTube
                </div>
              </a>
              <a
                href="/admin?tab=messages"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-navy">Ver Mensagens</div>
                <div className="text-sm text-gray-600">
                  {stats?.pendingMessages ||
                    (0 > 0 && (
                      <span className="text-orange-600 font-medium">
                        {stats?.pendingMessages} pendentes
                      </span>
                    ))}
                  {stats?.pendingMessages || (0 === 0 && "Todas respondidas")}
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Versão do Sistema</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Última Atualização</span>
                <span className="font-medium">21/09/2024</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Status do Site</span>
                <span className="font-medium text-green-600">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
