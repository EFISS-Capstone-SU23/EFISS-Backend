.PHONY: all help deploy_all deploy_interactive deploy_diff_dev deploy_diff_prod

# Default target executed when no arguments are given to make.
all: help

deploy_interactive:
	bash scripts/deploy_interactive.sh

deploy_all:
	bash scripts/deploy_all.sh

deploy_diff_dev:
	bash scripts/deploy_diff.sh dev

deploy_diff_prod:
	bash scripts/deploy_diff.sh prod

######################
# HELP
######################

help:
	@echo '----'
	@echo 'deploy_all: Deploy all the services'
	@echo 'deploy_interactive: Choose the services to deploy interactively'
	@echo 'deploy_diff_dev: Deploy the services that have changed compared to develop'
	@echo 'deploy_diff_prod: Deploy the services that have changed compared to main'