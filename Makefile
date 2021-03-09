PYTHON = python3

frontend:
	$(PYTHON) -m http.server --directory frontend/public

.PHONY: frontend
