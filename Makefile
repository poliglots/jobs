.PHONY: ui crawl

ui:
	cd ui && yarn && yarn build;

crawl:
	cd crawl && yarn && yarn jobs;