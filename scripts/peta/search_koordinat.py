import requests
import json

url = "https://geoservices.big.go.id/rbi/rest/services/BATASWILAYAH/Administrasi_AR_KelDesa_10K/MapServer/0/query"

params = {
    "where": "OBJECTID=86822",
    "outFields": "*",
    "returnGeometry": "true",
    "f": "geojson"
}

data = requests.get(url, params=params).json()

with open("karangtalun.geojson", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Berhasil disimpan!")

