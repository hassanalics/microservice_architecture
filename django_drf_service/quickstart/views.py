from rest_framework import viewsets
from .models import Reporter, Article
from .serializers import ReporterSerializer, ArticleSerializer

class ReporterViewSet(viewsets.ModelViewSet):  # ViewSet for Book model
    queryset = Reporter.objects.all()
    serializer_class = ReporterSerializer

class ArticleViewSet(viewsets.ModelViewSet):  # ViewSet for Book model
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer