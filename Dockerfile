# Kanaye — site statique servi par Nginx
# Fonctionne tel quel avec Coolify : détectez ce Dockerfile lors de la
# création de l'application (« Dockerfile » comme méthode de build),
# aucune configuration supplémentaire n'est nécessaire.

FROM nginx:1.27-alpine

# Configuration Nginx (cache long sur les assets, page 404 -> index)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers du site
COPY index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ > /dev/null || exit 1
