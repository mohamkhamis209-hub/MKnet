#!/usr/bin/env python3
"""
MKnet Network Manager - Local Web Preview Server
Starts an HTTP server to preview MKnet locally in any browser without CORS or ES-module file:// restrictions.
"""

import http.server
import os
import socket
import sys
import threading
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent

class MKnetHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".webmanifest": "application/manifest+json",
        ".svg": "image/svg+xml",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".json": "application/json",
        ".css": "text/css",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        # Enable development caching headers & CORS
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        # Clean formatted logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def find_free_port(start_port: int = 8080) -> int:
    port = start_port
    while port < 65535:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
        port += 1
    return start_port

def main():
    os.chdir(ROOT)
    port = find_free_port(8080)
    server_address = ("127.0.0.1", port)

    try:
        httpd = http.server.ThreadingHTTPServer(server_address, MKnetHandler)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("\n" + "=" * 60)
    print("   🌐 MKnet Network Manager - Local Preview Server")
    print("=" * 60)
    print(f"   Root Directory : {ROOT}")
    print(f"   Local Address  : {url}")
    print(f"   PWA Manifest   : http://localhost:{port}/manifest.webmanifest")
    print(f"   Mode           : Interactive Demo & Web Shell")
    print("=" * 60)
    print("   Press Ctrl+C to stop the preview server.\n")

    # Automatically launch default browser in background thread
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping MKnet preview server...")
        httpd.shutdown()
        print("Server stopped cleanly. Goodbye!\n")

if __name__ == "__main__":
    main()
