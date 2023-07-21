.PHONY: all help deploy_all deploy_interactive deploy_diff_dev deploy_diff_prod deploy_dev deploy_prod

# Default target executed when no arguments are given to make.
all: help

deploy_interactive:
	bash scripts/deploy-interactive.sh

deploy_dev:
	if [ -z "$(GITHUB_HEAD_REF)" ]; then \
		echo "GITHUB_HEAD_REF is not set"; \
		bash scripts/deploy-all.sh; \
	else \
		bash scripts/deploy-diff.sh dev; \
	fi

deploy_prod:
	if [ -z "$(GITHUB_HEAD_REF)" ]; then \
		echo "GITHUB_HEAD_REF is not set"; \
		bash scripts/deploy-all.sh; \
	else \
		bash scripts/deploy-diff.sh prod; \
	fi

deploy_all:
	bash scripts/deploy-all.sh

deploy_diff_dev:
	bash scripts/deploy-diff.sh dev

deploy_diff_prod:
	bash scripts/deploy-diff.sh prod

######################
# HELP
######################

help:
	@echo '----'
	@echo 'deploy_all: Deploy all the services'
	@echo 'deploy_interactive: Choose the services to deploy interactively'
	@echo 'deploy_diff_dev: Deploy the services that have changed compared to develop'
	@echo 'deploy_diff_prod: Deploy the services that have changed compared to main'