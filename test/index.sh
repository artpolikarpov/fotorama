#!/bin/bash

for DIR in $(find ./test -type d); do
  (
    echo -e "<html>\n<head><meta name=\"viewport\" content=\"width=device-width\"></head>\n\n<body style=\"line-height: 1.6;\">\n<h1>Index of ${DIR}</h1>\n<ul>"
    ls -1pa "${DIR}" | grep -v "^\./$" | grep -v "index.html" | awk '{ printf "<li><a href=\"%s\">%s</a></li>\n",$1,$1 }'
    echo -e "</ul>\n</body>\n</html>"
  ) > "${DIR}/index.html"
done
