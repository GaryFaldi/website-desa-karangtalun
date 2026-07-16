import requests

url = "https://geoservices.big.go.id/rbi/rest/services/BATASWILAYAH/Administrasi_AR_KelDesa_10K/MapServer/0/query"

params = {
    "where": "UPPER(NAMOBJ)='KARANGTALUN'",
    "outFields": "*",
    "returnGeometry": "true",
    "f": "geojson"
}

r = requests.get(url, params=params)

print(r.status_code)

data = r.json()

print("Jumlah:", len(data["features"]))

for f in data["features"]:
    print(f["properties"])