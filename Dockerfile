FROM denoland/deno:alpine-1.26.1


RUN deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts

COPY run.sh /bin/
RUN chmod +x /bin/run.sh
RUN touch /url && touch /temp && chmod 0777 /temp && chmod 0777 /url

USER deno
CMD ["/bin/run.sh"]