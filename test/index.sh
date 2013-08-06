#!/bin/bash

for DIR in $(find ./test -type d); do
  (
    echo -e "<html>\n<body>\n<h1>Manual tests</h1>\n<hr/>\n<pre>"
    ls -1pa "${DIR}" | grep -v "^\./$" | grep -v "index.html" | awk '{ printf "<a href=\"%s\">%s</a>\n",$1,$1 }' 
    echo -e "</pre>\n</body>\n</html>"
  ) > "${DIR}/index.html"
done
