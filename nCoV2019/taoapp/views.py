#!/usr/bin/env python

import os
import json
import re
import time
import logging
import datetime
import requests

from django.shortcuts import render
from django.db import models
from idna import unicode

from .models import onedatasql, twodatasql, threedatasql
from django.http import HttpResponse
import json

from django.core import serializers
from django.http import HttpResponse

import time
from datetime import datetime
from django.shortcuts import render

def index(request):
    return render(request, 'keji/index.html',)
def solutions(request):
    return render(request, 'keji/solutions.html',)
def productshow(request):
    return render(request, 'keji/product-show.html',)

def caseinform(request):
    return render(request, 'keji/casein-form.html',)

def servicecenter(request):
    return render(request, 'keji/service-center.html',)
def aboutus(request):
    return render(request, 'keji/about-us.html',)

def news(request):
    return render(request, 'keji/news.html',)










































#!/usr/bin/env python





def getdata(request):
    onedata_recviced = onedatasql.objects.all()
    return HttpResponse(json.dumps(onedata_recviced), content_type='application/json')


headers = {
    'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"}


# 代理ip
# proxies = {
#     'http':'59.32.37.5:3128',
# }


def downloaddata():
    url = 'https://lab.isaaclin.cn/nCoV/api/area'
    r = requests.get(url)
    tempjson1 = json.loads(r.text)

    if tempjson1["success"]:
        temp1 = tempjson1["results"]
        singledata = [];

        for x in temp1:
            single = []
            if (x['countryEnglishName'] == "China"):
                for kv in x.items():
                    if kv[0] != 'cities':
                        single.append(kv)

            singledata.append(dict(single))



    else:
       print("api错误")

    json1 = singledata

    r2 = requests.get('https://lab.isaaclin.cn/nCoV/api/overall')
    json2 = r2.text
    r3 = requests.get('https://lab.isaaclin.cn/nCoV/api/news')
    json3temp= json.loads(r3.text)

    json3=json3temp['results']

    p1 = onedatasql(one=json1)
    p1.save()



    p2 = twodatasql(two=json2)
    p2.save()


    p3 = threedatasql(three=json3)
    p3.save()




def nCoV2019(request):

    onedata_recviced = str(onedatasql.objects.all().order_by("-id")[0])
    twodata_recviced = str(twodatasql.objects.all().order_by("-id")[0])
    threedata_recviced = str(threedatasql.objects.all().order_by("-id")[0])

    return render(request, 'nCoV2019.html',
                  {'onedata_recviced': onedata_recviced,
                   'twodata_recviced': twodata_recviced,
                   'threedata_recviced': threedata_recviced,
                   })


def ciyun():
    filename = 'static/nCoV2019/test_text.txt'
    threedata_recviced = str(threedatasql.objects.all().order_by("-id")[0])
    with open(filename, 'w') as file_object:
        file_object.write(threedata_recviced)

    # 导入扩展库
    import re  # 正则表达式库
    import collections  # 词频统计库
    import numpy as np  # numpy数据处理库
    import jieba  # 结巴分词
    import wordcloud  # 词云展示库
    from PIL import Image  # 图像处理库
    import matplotlib.pyplot as plt  # 图像展示库

    from matplotlib import colors
    # 读取文件
    fn = open('static/nCoV2019/test_text.txt')  # 打开文件
    string_data = fn.read()  # 读出整个文件
    fn.close()  # 关闭文件

    # 文本预处理
    pattern = re.compile(u'\t|\n|\.|-|:|;|\)|\(|\?|"')  # 定义正则表达式匹配模式
    string_data = re.sub(pattern, '', string_data)  # 将符合模式的字符去除

    # 文本分词
    seg_list_exact = jieba.cut(string_data, cut_all=False)  # 精确模式分词
    object_list = []
    remove_words = [u'病例', u'出院', u'新增', u'治愈', u'确诊', u'（', u'）', u'月', u'日', u'title',
                    u'summary', u'infoSource', u'sourceUrl', u'http', u'pubDate', u'provinceName', u'',
                    u'/', u'/', u'死亡', u'/', u'时',
                    u'mweibocn', u',', u'1', u'2', u'3', u'19', u',', u'1', u'2', u'3',
                    u'‘', u'\'', u'例', u't', u'n', u'{', u'/',
                    u'\\', u'', u'，n', u'', u'}', u'provinceId', u'“', u'“', u'“', u'”', u'的', u'，',
                    u'和', u'是', u'随着', u'对于', u'对', u'等', u'能', u'都', u'。', u' ', u'、', u'中', u'在', u'了',
                    u'通常', u'如果', u'我们', u'需要']

    for word in seg_list_exact:  # 循环读出每个分词
        if word not in remove_words:  # 如果不在去除词库中
            object_list.append(word)  # 分词追加到列表

    # 词频统计
    word_counts = collections.Counter(object_list)  # 对分词做词频统计
    word_counts_top10 = word_counts.most_common(100)  # 获取前10最高频的词
    print(word_counts_top10)  # 输出检查

    # 自定义颜色列表
    color_list = ['#CD853F', '#DC143C', '#00FF7F', '#FF6347', '#8B008B', '#00FFFF', '#0000FF', '#8B0000', '#FF8C00',
                  '#1E90FF', '#00FF00', '#FFD700', '#008080', '#008B8B', '#8A2BE2', '#228B22', '#FA8072', '#808080']

    colormapdata = colors.ListedColormap(color_list)

    mask = np.array(Image.open('static/nCoV2019/back_coloring_path.jpg'))  # 定义词频背景
    wc = wordcloud.WordCloud(
        # font_path='C:/Windows/Fonts/STKAITI.TTF',  # 设置字体格式
        font_path='/usr/share/fonts/dejavu/STKAITI.TTF',
        mask=mask,  # 设置背景图
        background_color="black",
        max_font_size=120,  # 字体最大值
        colormap=colormapdata,  # 自定义构建colormap对象
        margin=2, random_state=100,
        prefer_horizontal=0.5)

    wc.generate_from_frequencies(word_counts)  # 从字典生成词云
    # image_colors = wordcloud.ImageColorGenerator(mask) # 从背景图建立颜色方案
    # wc.recolor(color_func=image_colors) # 将词云颜色设置为背景图方案
    plt.imshow(wc)  # 显示词云
    plt.axis('off')  # 关闭坐标轴

    wc.to_file("static/nCoV2019/ciyun.png")
#     plt.show()  # 显示图像
#






