
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Eye, 
  Check, 
  X, 
  Mail, 
  Phone, 
  Calendar,
  ExternalLink 
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'replied'>('all');
  const [alert, setAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/contact-messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === id ? { ...msg, status } : msg
        ));
        
        setAlert({
          type: 'success',
          text: `Mensagem marcada como ${status === 'read' ? 'lida' : 'respondida'}!`
        });

        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setAlert({
        type: 'error',
        text: 'Erro ao atualizar status da mensagem.'
      });
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read if it's pending
    if (message.status === 'pending') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const handleWhatsAppContact = (message: ContactMessage) => {
    const whatsappMessage = `Olá ${message.name}! 

Recebi sua mensagem através do site sobre: "${message.subject}"

Vou te responder sobre: ${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}

Vamos conversar?`;

    const phone = message.phone || '5599818384815'; // Fallback to professional's phone
    const whatsappUrl = generateWhatsAppLink(phone, whatsappMessage);
    
    window.open(whatsappUrl, '_blank');
    
    // Mark as replied
    updateMessageStatus(message.id, 'replied');
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive">Pendente</Badge>;
      case 'read':
        return <Badge className="bg-yellow-100 text-yellow-800">Lida</Badge>;
      case 'replied':
        return <Badge className="bg-green-100 text-green-800">Respondida</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-16 bg-gray-200 rounded" />
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
      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Mensagens de Contato</h2>
        <p className="text-gray-600">Gerencie mensagens enviadas através do formulário de contato</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Todas', count: messages.length },
          { key: 'pending', label: 'Pendentes', count: messages.filter(m => m.status === 'pending').length },
          { key: 'read', label: 'Lidas', count: messages.filter(m => m.status === 'read').length },
          { key: 'replied', label: 'Respondidas', count: messages.filter(m => m.status === 'replied').length },
        ].map((filterOption) => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterOption.key as any)}
            className={filter === filterOption.key ? 'bg-navy hover:bg-navy/90' : ''}
          >
            {filterOption.label} ({filterOption.count})
          </Button>
        ))}
      </div>

      {/* Alert */}
      {alert && (
        <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{alert.text}</AlertDescription>
        </Alert>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-navy">{message.name}</h3>
                    {getStatusBadge(message.status)}
                  </div>
                  <p className="text-lg text-gray-800 mb-2">{message.subject}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(message.createdAt).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  {message.status !== 'replied' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleWhatsAppContact(message)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 line-clamp-2">
                {message.message}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Nenhuma mensagem recebida ainda' 
                : `Nenhuma mensagem ${filter === 'pending' ? 'pendente' : filter === 'read' ? 'lida' : 'respondida'}`
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Mensagem</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-navy">
                    {selectedMessage.name}
                  </h3>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-teal hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(selectedMessage.createdAt).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Assunto:</h4>
                <p className="text-lg text-navy">{selectedMessage.subject}</p>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mensagem:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleWhatsAppContact(selectedMessage)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Responder via WhatsApp
                </Button>
                
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Responder por Email
                </a>

                {selectedMessage.status !== 'replied' && (
                  <Button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                    variant="outline"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Marcar como Respondida
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
