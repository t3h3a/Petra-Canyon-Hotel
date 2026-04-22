from __future__ import annotations

from urllib.parse import urljoin, urlparse

from flask import request


def is_safe_redirect_target(target: str | None) -> bool:
    if not target:
        return False

    host_url = request.host_url
    test_url = urlparse(urljoin(host_url, target))
    ref_url = urlparse(host_url)
    return test_url.scheme in {"http", "https"} and ref_url.netloc == test_url.netloc
