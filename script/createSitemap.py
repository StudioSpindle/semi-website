##
# This script creates a live sitemap and posts the new website to the wayback machine
# Script should run with python3 and after the site is uploaded and invalidated
##

from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import re
from datetime import datetime

LOADEDLINKS = []

def getLinks(i):

    global LOADEDLINKS

    url = i.split('#')[0]

    if url not in LOADEDLINKS:

        if ('.jpg' in url) or ('.zip' in url) or ('.svg' in url):
            return
        
        LOADEDLINKS.append(url)
       
        try:
            print('REQUEST', 'https://www.semi.technology' + url)
            request = urlopen('https://www.semi.technology' + url)
        except:
            return

        if request.status is 200:
            soup = BeautifulSoup(request.read(), "lxml")
            for link in soup.findAll('a'):
                link = link.get('href')
                if link is not None:
                    if ('https://' not in link) and ('http://' not in link) and ('mailto:' not in link) and ('javascript:' not in link):
                        link = link.split('#')[0]
                        if link.startswith('/'):
                            getLinks(link)
                        elif link.startswith('./'):
                            getLinks(link.replace('./', '/'))
                        elif link != '':
                            getLinks(url+link)

# Get the links
getLinks("/")

# create sitemap
sitemap = open('sitemap.xml', 'w+')
sitemap.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+"\n")
for link in LOADEDLINKS:
    sitemap.write('<url>'+"\n")
    sitemap.write('<loc>https://semi.technology'+link+'</loc>'+"\n")
    sitemap.write('<lastmod>'+datetime.today().strftime('%Y-%m-%d')+'</lastmod>'+"\n")
    sitemap.write('</url>'+"\n")
sitemap.write('</urlset>')

# post links to the wayback machine
for link in LOADEDLINKS:
    url = 'https://www.semi.technology' + link
    request = requests.post(url = 'https://pragma.archivelab.org', json = { 'url': url })
    print(request.status_code, url)

print('DONE')