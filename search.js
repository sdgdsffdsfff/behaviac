---
---
var docs = 
[
    {% for post in site.posts limit:100 %}
    {% include post.json %},
    {% endfor %}
  
    {% for post in site.docs limit:100 %}
    {% include post.json %},
    {% endfor %}
];

