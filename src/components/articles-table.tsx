
"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { ArticleStatus } from "@/lib/types";
import { updateArticleStatus } from "@/lib/actions";
import { Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, Loader2, Inbox } from "lucide-react";

interface ArticlesTableProps {
  initialArticles: Article[];
  onUpdate: () => Promise<void>;
}

export default function ArticlesTable({ initialArticles, onUpdate }: ArticlesTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleStatusChange = async (articleId: string, status: ArticleStatus) => {
    setLoadingStates(prev => ({ ...prev, [articleId]: true }));
    const result = await updateArticleStatus(articleId, status);
    if (result.success) {
      await onUpdate();
      toast({ title: "Success", description: `Article marked as ${status}.` });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error || "Failed to update status." });
    }
    setLoadingStates(prev => ({ ...prev, [articleId]: false }));
  };

  const getStatusVariant = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.Accepted:
        return "default";
      case ArticleStatus.Review:
        return "secondary";
      case ArticleStatus.Archived:
        return "outline";
      case ArticleStatus.Deleted:
        return "destructive";
      default:
        return "secondary";
    }
  };
  
  const formatDate = (date: Timestamp) => {
    if (!date) return 'N/A';
    return date.toDate().toLocaleDateString();
  }

  if (initialArticles.length === 0) {
      return (
          <Card className="flex flex-col items-center justify-center py-16">
              <Inbox className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Articles Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                  There are currently no articles to review.
              </p>
          </Card>
      );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialArticles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium max-w-xs truncate">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline" title={article.shortDescription}>
                    {article.title}
                </a>
              </TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell>{formatDate(article.date)}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(article.status)} className="capitalize">{article.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {loadingStates[article.id] ? (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={article.status === ArticleStatus.Accepted} onClick={() => handleStatusChange(article.id, ArticleStatus.Accepted)}>
                            Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={article.status === ArticleStatus.Archived} onClick={() => handleStatusChange(article.id, ArticleStatus.Archived)}>
                            Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" disabled={article.status === ArticleStatus.Deleted} onClick={() => handleStatusChange(article.id, ArticleStatus.Deleted)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
