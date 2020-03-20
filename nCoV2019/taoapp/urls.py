from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('nCoV2019.html', views.nCoV2019, name='nCoV2019'),

    path('index.html', views.index, name='index'),
    path('solutions.html', views.solutions, name='solutions'),
    path('product-show.html', views.productshow, name='product-show'),
    path('case-inform.html', views.caseinform, name='case-inform'),
    path('service-center.html', views.servicecenter, name='service-center'),
    path('about-us.html', views.aboutus, name='about-us'),
    path('news.html', views.news, name='news'),

]