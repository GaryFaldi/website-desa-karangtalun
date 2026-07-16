import { ViteReactSSG } from "vite-react-ssg";
import { Link, NavLink, Outlet, ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Building2, Camera, ChevronDown, ChevronUp, Layers, MapPin, Maximize2, Minimize2, Phone, RotateCcw, Search, Shapes, Store, X } from "lucide-react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/components/layout/Navigation.jsx
var NAV_ITEMS = [
	{
		label: "Beranda",
		href: "/"
	},
	{
		label: "Profil Desa",
		href: "/profil-desa/overview"
	},
	{
		label: "Pemerintahan",
		children: [{
			label: "Struktur Organisasi",
			href: "/pemerintahan/struktur-organisasi"
		}, {
			label: "Statistik Desa",
			href: "/pemerintahan/statistik-desa"
		}]
	},
	{
		label: "Potensi Desa",
		href: "/potensi-desa/overview"
	},
	{
		label: "Galeri",
		href: "/galeri/overview"
	},
	{
		label: "Peta Lokasi",
		children: [{
			label: "Peta Interaktif",
			href: "/peta-lokasi/peta-interaktif"
		}, {
			label: "Fasilitas Umum",
			href: "/peta-lokasi/fasilitas-umum"
		}]
	}
];
function Navigation() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);
	const [scrolled, setScrolled] = useState(false);
	const navRef = useRef(null);
	useEffect(() => {
		setMobileOpen(false);
		setOpenDropdown(null);
	}, [useLocation().pathname]);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setOpenDropdown(null);
				setMobileOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const toggleDropdown = (label) => setOpenDropdown((prev) => prev === label ? null : label);
	return /* @__PURE__ */ jsxs("nav", {
		ref: navRef,
		className: `navbar ${scrolled ? "navbar--scrolled" : ""}`,
		"aria-label": "Navigasi utama",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container navbar__inner",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "navbar__logo",
					"aria-label": "Kembali ke Beranda",
					children: [/* @__PURE__ */ jsx("span", {
						className: "navbar__logo-icon",
						"aria-hidden": "true",
						children: "🌿"
					}), /* @__PURE__ */ jsxs("span", {
						className: "navbar__logo-text",
						children: ["Desa ", /* @__PURE__ */ jsx("strong", { children: "Karangtalun" })]
					})]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "navbar__menu",
					role: "list",
					children: NAV_ITEMS.map((item) => item.children ? /* @__PURE__ */ jsxs("li", {
						className: `navbar__item navbar__item--dropdown ${openDropdown === item.label ? "navbar__item--open" : ""}`,
						onMouseEnter: () => setOpenDropdown(item.label),
						onMouseLeave: () => setOpenDropdown(null),
						children: [/* @__PURE__ */ jsxs("button", {
							className: "navbar__link navbar__link--parent",
							"aria-expanded": openDropdown === item.label,
							"aria-haspopup": "true",
							onClick: () => toggleDropdown(item.label),
							id: `nav-${item.label.toLowerCase().replace(/\s/g, "-")}`,
							children: [item.label, /* @__PURE__ */ jsx("span", {
								className: "navbar__chevron",
								"aria-hidden": "true",
								children: "▾"
							})]
						}), /* @__PURE__ */ jsx("ul", {
							className: "navbar__dropdown",
							role: "list",
							"aria-labelledby": `nav-${item.label.toLowerCase().replace(/\s/g, "-")}`,
							children: item.children.map((child) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, {
								to: child.href,
								className: ({ isActive }) => `navbar__dropdown-link ${isActive ? "navbar__dropdown-link--active" : ""}`,
								children: child.label
							}) }, child.href))
						})]
					}, item.label) : /* @__PURE__ */ jsx("li", {
						className: "navbar__item",
						children: /* @__PURE__ */ jsx(NavLink, {
							to: item.href,
							end: true,
							className: ({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`,
							children: item.label
						})
					}, item.label))
				}),
				/* @__PURE__ */ jsxs("button", {
					className: `navbar__hamburger ${mobileOpen ? "navbar__hamburger--open" : ""}`,
					"aria-label": mobileOpen ? "Tutup menu" : "Buka menu",
					"aria-expanded": mobileOpen,
					"aria-controls": "mobile-menu",
					onClick: () => setMobileOpen((prev) => !prev),
					children: [
						/* @__PURE__ */ jsx("span", {}),
						/* @__PURE__ */ jsx("span", {}),
						/* @__PURE__ */ jsx("span", {})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			id: "mobile-menu",
			className: `navbar__mobile ${mobileOpen ? "navbar__mobile--open" : ""}`,
			"aria-hidden": !mobileOpen,
			children: /* @__PURE__ */ jsx("ul", {
				role: "list",
				className: "navbar__mobile-list",
				children: NAV_ITEMS.map((item) => item.children ? /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("button", {
					className: `navbar__mobile-parent ${openDropdown === item.label ? "navbar__mobile-parent--open" : ""}`,
					onClick: () => toggleDropdown(item.label),
					"aria-expanded": openDropdown === item.label,
					children: [item.label, /* @__PURE__ */ jsx("span", {
						className: "navbar__chevron",
						"aria-hidden": "true",
						children: "▾"
					})]
				}), openDropdown === item.label && /* @__PURE__ */ jsx("ul", {
					className: "navbar__mobile-sub",
					role: "list",
					children: item.children.map((child) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, {
						to: child.href,
						className: ({ isActive }) => `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`,
						children: child.label
					}) }, child.href))
				})] }, item.label) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, {
					to: item.href,
					end: true,
					className: ({ isActive }) => `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`,
					children: item.label
				}) }, item.label))
			})
		})]
	});
}
//#endregion
//#region src/components/layout/Footer.jsx
var FOOTER_LINKS = [{
	heading: "Profil Desa",
	links: [
		{
			label: "Overview Desa",
			href: "/profil-desa/overview"
		},
		{
			label: "Struktur Organisasi",
			href: "/pemerintahan/struktur-organisasi"
		},
		{
			label: "Statistik Desa",
			href: "/pemerintahan/statistik-desa"
		}
	]
}, {
	heading: "Potensi Desa",
	links: [
		{
			label: "Overview Potensi",
			href: "/potensi-desa/overview"
		},
		{
			label: "Galeri Desa",
			href: "/galeri/overview"
		},
		{
			label: "Peta Interaktif",
			href: "/peta-lokasi/peta-interaktif"
		},
		{
			label: "Fasilitas Umum",
			href: "/peta-lokasi/fasilitas-umum"
		}
	]
}];
function Footer() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ jsxs("footer", {
		className: "footer",
		"aria-label": "Footer situs",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container footer__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "footer__brand",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "footer__logo",
						children: [/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "🌿"
						}), /* @__PURE__ */ jsxs("span", { children: ["Desa ", /* @__PURE__ */ jsx("strong", { children: "Karangtalun" })] })]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "footer__desc",
						children: "Website resmi Desa Karangtalun — menyajikan informasi profil desa, potensi dusun, dan layanan publik secara transparan."
					}),
					/* @__PURE__ */ jsxs("address", {
						className: "footer__address",
						children: [/* @__PURE__ */ jsx("p", { children: "📍 Desa Karangtalun, Kab. Magelang" }), /* @__PURE__ */ jsx("p", { children: "🕐 Senin–Jumat, 08.00–15.00 WIB" })]
					})
				]
			}), FOOTER_LINKS.map((col) => /* @__PURE__ */ jsxs("nav", {
				"aria-label": `Navigasi ${col.heading}`,
				children: [/* @__PURE__ */ jsx("h3", {
					className: "footer__heading",
					children: col.heading
				}), /* @__PURE__ */ jsx("ul", {
					className: "footer__links",
					role: "list",
					children: col.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: link.href,
						className: "footer__link",
						children: link.label
					}) }, link.href))
				})]
			}, col.heading))]
		}), /* @__PURE__ */ jsx("div", {
			className: "footer__bottom",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container footer__bottom-inner",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					year,
					" Desa Karangtalun. Dibuat oleh tim KKN."
				] }), /* @__PURE__ */ jsxs("p", { children: [
					"Dibangun dengan",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://vite.dev",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "footer__bottom-link",
						children: "Vite"
					}),
					" ",
					"&",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://react.dev",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "footer__bottom-link",
						children: "React"
					})
				] })]
			})
		})]
	});
}
//#endregion
//#region src/lib/seo.jsx
/**
* Komponen SEO Helper untuk Website Desa Karangtalun
* 
* Menghasilkan meta tags untuk SEO dan social media preview (OpenGraph, Twitter Card)
* yang ter-render secara statis di HTML saat build SSG.
* 
* Menggunakan react-helmet-async yang sudah terintegrasi dengan vite-react-ssg.
* 
* @component
* @param {Object} props
* @param {string} [props.title] - Judul halaman (akan ditambahkan suffix " — Desa Karangtalun")
* @param {string} [props.description] - Deskripsi meta tag untuk halaman
* @param {string} [props.image] - URL gambar untuk OpenGraph preview (absolut atau relatif)
* @param {string} [props.url] - URL canonical untuk halaman (opsional)
* @param {string} [props.type='website'] - Tipe OpenGraph (website, article, profile, dll)
* 
* @example
* <SEO 
*   title="Beranda" 
*   description="Portal resmi Desa Karangtalun"
*   image="/assets/hero-desa.jpg"
* />
*/
function SEO({ title, description, image, url, type = "website" }) {
	const DEFAULT_TITLE = "Website Resmi Desa Karangtalun";
	const DEFAULT_DESCRIPTION = "Portal resmi Pemerintahan Desa Karangtalun, Kabupaten Magelang, Jawa Tengah. Informasi pelayanan publik, profil wilayah, potensi 12 dusun, dan transparansi pemerintahan desa.";
	const DEFAULT_IMAGE = "/assets/hero-desa.jpg";
	const SITE_NAME = "Desa Karangtalun";
	const pageTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
	const pageDescription = description || DEFAULT_DESCRIPTION;
	const pageImage = image || DEFAULT_IMAGE;
	const absoluteImage = pageImage.startsWith("http") ? pageImage : `${pageImage}`;
	const pageUrl = url || (typeof window !== "undefined" ? window.location.href : "");
	return /* @__PURE__ */ jsxs(Helmet, { children: [
		/* @__PURE__ */ jsx("title", { children: pageTitle }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: pageDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: type
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: SITE_NAME
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: pageTitle
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: pageDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: absoluteImage
		}),
		pageUrl && /* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: pageUrl
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: pageTitle
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: pageDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: absoluteImage
		}),
		pageUrl && /* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: pageUrl
		})
	] });
}
//#endregion
//#region src/components/layout/Layout.jsx
function Layout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "layout",
		children: [
			/* @__PURE__ */ jsx(SEO, {}),
			/* @__PURE__ */ jsx(Navigation, {}),
			/* @__PURE__ */ jsx("main", {
				id: "main-content",
				className: "layout__main",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(ScrollRestoration, {})
		]
	});
}
//#endregion
//#region src/assets/icons/family.png
var family_exports = /* @__PURE__ */ __exportAll({ default: () => family_default });
var family_default = "/assets/family-mviolWDB.png";
//#endregion
//#region src/assets/icons/house.png
var house_exports = /* @__PURE__ */ __exportAll({ default: () => house_default });
var house_default = "/assets/house-a4QcdqNQ.png";
//#endregion
//#region src/assets/icons/land-plot.png
var land_plot_exports = /* @__PURE__ */ __exportAll({ default: () => land_plot_default });
var land_plot_default = "/assets/land-plot-7eMBf47A.png";
//#endregion
//#region src/assets/icons/organization-chart.png
var organization_chart_exports = /* @__PURE__ */ __exportAll({ default: () => organization_chart_default });
var organization_chart_default = "/assets/organization-chart-CqgzNKDI.png";
//#endregion
//#region src/assets/icons/users-alt.png
var users_alt_exports = /* @__PURE__ */ __exportAll({ default: () => users_alt_default });
var users_alt_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAACHFJREFUeJztm22MVNUZx3/PuXdw2VUkCtgmtlbohxprWqV2CVq6RHZ2Zl8oCV2rTRuJi+suLWn1gzSpNhQNadWmRGXfpFsa06DQVGFhdmcXskYMstImIvQtQiniC+pSlSKru3Pv0w97Z5gu83Jndnambfh/uufc8zz/5zxzzp17/s+MkANWR8IzRgMsE1eWIlwr8BkAhRMgh0F3jI7Yz3V/Y8e/cvFbSn7xM2jtYJX99lj59wTuB2ZlGf4eoutOvX9x+7Zbtzl+AykVf9YE/HBw2cyRsdFnBIJJ3Qr8BTjuta8Crkn2J0qfY0Zv66re/WE2jlLyZ0zAd6PBigqx9wLXe8PPoPoLbPNkxy0730weuzISvtK2TbOg9ypUeN1/dD+xFnU19JzNPtXS8GdMQEt/3TbQb3rNwzG1lm6q6TmWyaZ5T3ieOGa7oNcCiPBMe3XktowzLSF/2gS0RsNhFYl4g47ZMa18vLb3PT+BN/XVXBYw9hDo5wFUCXbWRAb82Bab36RzoiLrEpfG/ZZfcoBfhaL/dFW/w/heRYSH/NoWmz9lApr3hOcBXwEQeLZtSd8B35F76KqJDKmw3Wt+dWW04Wq/tsXkT5kA4xI+15KncyVPwNWErYUbzjS0VPwpEyAqiWw5Yoby5bdt2Z/wKcz1a1dM/pQJcGFO/Pqisdg7+QZgPtGT8WtFr/BrV0z+1CtAOJ3UnJFvACPTAjMTPpEP/NoVkz/NFtDES0bMmC/kG0DAHUvYqupbfu2KyZ/6a9A1e89F4y7NNwCQhK2IvuDbrIj8KRMwfLp8H/AugIrc1TzYkO0Ach5aosE5CisBUE5+al/lS35ti8mfMgHbbt3miPKo17zUjDltqL+To0coYLfh7V8VHlm7dq3r17yY/GnfBEemnX0c5ajXbGwZqN3QuLXRysbduLXRahmoewxhudf12rSYbvQdfJH5Mx+GonVfxOg+lEsAVBjEMfd0hnYeTDV+VX/tl13YAHzd6zptuc7CjaHon7IFXir+rMuqZaC+CnV+B3K51+UC+1EGxHjncdXPqVKNSCXnVtWwKss7ayL+H34l4Pe1r5r3hOcZR7qBRf7C1ufFmKb2Jbv+7m986fj9P1iAlmhtPbASIQhMn3D7rAr9BtnUXr1rVy5+S8mfUwLiaO5pKDfT3Llq6ZUA4sgb0y8pP/rLhdtG8vH3v8Z/Af9PyGsL5ItS1xVSoSgJKHVdIRNyT4AiLX2hq1xjrrCMzHIdeSPdiwlMra7f3Ndwg2W5n3ZcHTau+05HqO84Mq4D+oWvBNy5feklF5U5t7tGw6LczH9+iq665oZUSZhKXb81WjdfRQ9MmMOwCi8KGjH2yJa2xc+fyTY3O9PNlmhwjmDdrxK7Q2GG5JRbqJDAZlBv8hyOqUmr62+q7X0D+EnznvBvknT9+VaZ0w2cp+s7atTIeTtklijLQJa5Y+WPtvTXbnYD1oNdi3uG08WYegUo0jpQ26Twc+CyZF5ED6KyV+F1RIdxrIOpPv27d9eGxKXX83fUsi6q3Ljk2VPpAklG82DDLDPmDMG4jpdO128ZCF+vcB0qswSuQvRmVL4EJB2a9JSqWdMZ3NWdanucl4AVg1VlZWPl3cDtSd3/EKTDjrndfvX5lv7aA4xL22qMW5mrtN0cra00wktejC93BCOVfuxWR8KzxwLShNIKfDZxQ+S3gTG36fHa3k+Sx8sE4xljtvQCC72uj0HXB2I8PNEwY/Dj7+5HPILftwcjy7PZpMLdA7XPji9piKk1N1tZLBkrBqvKymLla1B+BJQxHsze0bN2XfLXbEIPWDtYZccseYZzkz8hxq3sCPY+mMvkofR1BYDNi5//uKM68lN1zQLgBADK1wLTY1uSdYVEAk7Gyh9WIeQ1/+q6TmX7kr5X84m71HWFZHSGdh60sRcg/A1AoG7WpWd+Fr9vAFbtDt2I8gOvb9i1tL4rFH0738BLXVeYiCeCO94yjlMPDAOoyD2t0br5AAZFXNdsxEuGIE1dt/QeTe8uOwql649ZzqVJzUn90KItFD2i4omkYKnoEyhiVkXrqoAbARB2tgd37ZgMERRO1xexrkk0lDczDPWFzurIdoW4VrCgdSC8yDhG74wPMOKuS2ObG0pdV8gAVR5MXCNNRiBOciifMnQqlLqukAldNZEh4JDXXGqALcC7orqmEARQ+rpCVvfCA4w/U56esuPwisGqsrLR8sMI87yux059UHFvtiNu49ZG6/KZZzeAft/rei0Q0+tyfRfxiynVA0pdV/CDKRdESl1XyIaiKEKlritkQlE1wVLXFVKhqAmI44KufwEXcAH/LSj+Q3BCXQFgMrr+ZFGUBKwarLpYRyu+naaukIz3QF8UJHJGY1uequn/aKpjm9IErI6EZ8csHlCRO8hdGPlQVX9tW2UP+ZXT88HUJCBTXQFeAV5EOa5GxyeWUddnWIT72pdENk/F9ih4AtLVFUDb3YDdnalKAxl0fXgqENO7Cn0qLGgCvLpCBLjJ6xoRZb3t6CO5Bp5S14cXTOBsnZ+an18ULAFrB6vsd0bLe5Kk9dddob6rOnIoo2EWeEfkHuBKAISdp96vWFao0nnaH0rmigl1hT+bAJWTnTxAWzDyio1dGdf1Ueovn/nR+sn6jaMgK8ArVb8MGNBTxnUXtIWiRwrhO46V0YarbXGGgNmAa4y7oBAa5uRXgCIq2p7wpbKi0JMH2FTTc0xUm72mcV2zISedMQ0mnYCW/vBi4nUFZXtHTWTnZH2mQ3tN73NJuv7C5t2hmzIa+EABngHSFL/SPP4elyuMaILDqGnKNNaXv8k6QKgHQHm1Mxj5w6T9ZUF7de9+4PA45XjpfDIoxLfAZpSTwI8L4MsXRPU+4F0D+ZfePfwbxx7MgwIcnbsAAAAASUVORK5CYII=";
//#endregion
//#region src/pages/Beranda.jsx
var IMAGE_ICONS = Object.fromEntries(Object.entries(/* @__PURE__ */ Object.assign({
	"../assets/icons/family.png": family_exports,
	"../assets/icons/house.png": house_exports,
	"../assets/icons/land-plot.png": land_plot_exports,
	"../assets/icons/organization-chart.png": organization_chart_exports,
	"../assets/icons/users-alt.png": users_alt_exports
})).map(([path, mod]) => {
	const lastSlash = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
	const lastDot = path.lastIndexOf(".");
	return [path.substring(lastSlash + 1, lastDot > lastSlash ? lastDot : void 0), mod.default];
}));
var ICON_PATHS = {
	buildings: /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("path", { d: "M4 21V8l6-4v17" }),
		/* @__PURE__ */ jsx("path", { d: "M10 21V4l10 5v12" }),
		/* @__PURE__ */ jsx("path", { d: "M7 12h0M7 16h0M14 10h0M14 14h0M14 18h0" })
	] }),
	mapPin: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "9",
		r: "2.5"
	})] }),
	landmark: /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("path", { d: "M3 21h18" }),
		/* @__PURE__ */ jsx("path", { d: "M5 21V10M10 21V10M14 21V10M19 21V10" }),
		/* @__PURE__ */ jsx("path", { d: "M2 10 12 4l10 6" })
	] }),
	clipboard: /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("rect", {
			x: "6",
			y: "4",
			width: "12",
			height: "17",
			rx: "1.5"
		}),
		/* @__PURE__ */ jsx("path", { d: "M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" }),
		/* @__PURE__ */ jsx("path", { d: "M9 11h6M9 15h6" })
	] }),
	leaf: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "M20 4c-9 0-16 6-16 15 9 0 15-7 16-15Z" }), /* @__PURE__ */ jsx("path", { d: "M5 19c3-4 6-7 12-11" })] }),
	camera: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "13",
		r: "3.5"
	})] })
};
function Icon({ name, className }) {
	const image = IMAGE_ICONS[name];
	if (image) return /* @__PURE__ */ jsx("img", {
		src: image,
		className,
		alt: "",
		"aria-hidden": "true"
	});
	return /* @__PURE__ */ jsx("svg", {
		className,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: ICON_PATHS[name]
	});
}
var STATS = [
	{
		icon: "users-alt",
		value: "3.350",
		label: "Jiwa",
		note: "per SID Desa 2024"
	},
	{
		icon: "family",
		value: "1.110",
		label: "Kepala Keluarga",
		note: "per SID Desa 2024"
	},
	{
		icon: "house",
		value: "12",
		label: "Dusun",
		note: ""
	},
	{
		icon: "land-plot",
		value: "—",
		label: "Luas Wilayah",
		note: "segera diperbarui"
	}
];
var LAYANAN = [
	{
		id: "profil-desa",
		icon: "landmark",
		title: "Profil Desa",
		desc: "Sejarah, visi-misi, letak geografis, dan kontak resmi Desa Karangtalun.",
		href: "/profil-desa/overview",
		color: "green"
	},
	{
		id: "pemerintahan",
		icon: "clipboard",
		title: "Pemerintahan",
		desc: "Struktur organisasi perangkat desa dan data statistik kependudukan.",
		href: "/pemerintahan/struktur-organisasi",
		color: "blue"
	},
	{
		id: "wisata",
		icon: "leaf",
		title: "Potensi Desa",
		desc: "Potensi unggulan, UMKM, dan kuliner lokal desa.",
		href: "/potensi-desa/overview",
		color: "teal"
	},
	{
		id: "galeri",
		icon: "camera",
		title: "Galeri",
		desc: "Dokumentasi kegiatan dan momen penting tingkat desa.",
		href: "/galeri/overview",
		color: "amber"
	},
	{
		id: "peta",
		icon: "mapPin",
		title: "Peta Lokasi",
		desc: "Peta interaktif fasilitas umum, sekolah, dan tempat ibadah.",
		href: "/peta-lokasi/peta-interaktif",
		color: "rose"
	}
];
var DUSUN_SLUGS = [
	{
		slug: "baran",
		label: "Baran"
	},
	{
		slug: "dangkel-kulon",
		label: "Dangkel Kulon"
	},
	{
		slug: "dangkel-wetan",
		label: "Dangkel Wetan"
	},
	{
		slug: "jambon",
		label: "Jambon"
	},
	{
		slug: "jampiroso",
		label: "Jampiroso"
	},
	{
		slug: "jangkang",
		label: "Jangkang"
	},
	{
		slug: "jangkang-a",
		label: "Jangkang A"
	},
	{
		slug: "jangkang-b",
		label: "Jangkang B"
	},
	{
		slug: "joho",
		label: "Joho"
	},
	{
		slug: "kajoran",
		label: "Kajoran"
	},
	{
		slug: "karangtalun",
		label: "Karangtalun"
	},
	{
		slug: "selingan",
		label: "Selingan"
	}
];
function Beranda() {
	return /* @__PURE__ */ jsxs("div", {
		className: "beranda",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Beranda",
				description: "Portal resmi Pemerintahan Desa Karangtalun, Kabupaten Magelang. Informasi pelayanan publik, profil wilayah, dan potensi dusun.",
				image: "/assets/hero-desa.jpg"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "hero",
				"aria-label": "Sambutan",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: "/assets/hero-desa.jpg",
						alt: "Pemandangan Desa Karangtalun",
						className: "hero__image",
						loading: "eager"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hero__overlay",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "container hero__content",
						children: [
							/* @__PURE__ */ jsxs("h1", {
								className: "hero__title",
								children: [
									"Selamat Datang di",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "hero__title-accent",
										children: "Desa Karangtalun"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "hero__subtitle",
								children: "Website resmi Desa Karangtalun yang menyajikan profil desa, potensi 12 dusun, serta layanan publik secara transparan dan mudah diakses masyarakat."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hero__actions",
								children: [/* @__PURE__ */ jsx(Link, {
									to: "/profil-desa/overview",
									className: "btn btn--primary",
									id: "hero-cta-profil",
									children: "Profil Desa"
								}), /* @__PURE__ */ jsx(Link, {
									to: "/profil-desa/dusun/jampiroso",
									className: "btn btn--outline",
									id: "hero-cta-dusun",
									children: "Profil Dusun"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "stats",
				"aria-label": "Statistik desa",
				children: /* @__PURE__ */ jsx("div", {
					className: "container stats__grid",
					children: STATS.map((s) => /* @__PURE__ */ jsxs("div", {
						className: "stats__card",
						children: [/* @__PURE__ */ jsx(Icon, {
							name: s.icon,
							className: "stats__icon"
						}), /* @__PURE__ */ jsxs("div", {
							className: "stats__body",
							children: [
								/* @__PURE__ */ jsx("strong", {
									className: "stats__value",
									children: s.value
								}),
								/* @__PURE__ */ jsx("span", {
									className: "stats__label",
									children: s.label
								}),
								s.note && /* @__PURE__ */ jsx("span", {
									className: "stats__note",
									children: s.note
								})
							]
						})]
					}, s.label))
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "about section",
				"aria-label": "Tentang Desa Karangtalun",
				children: /* @__PURE__ */ jsxs("div", {
					className: "container about__inner",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "about__text",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "section-label",
								children: "Tentang Kami"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "about__title",
								children: "Mengenal Desa Karangtalun"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "about__body",
								children: "Desa Karangtalun merupakan salah satu desa yang terletak di Kabupaten Magelang, Jawa Tengah. Desa ini terdiri dari 12 dusun yang masing-masing memiliki potensi dan keunikan tersendiri."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "about__body",
								children: "Dengan kekayaan alam dan budaya yang dimiliki, Desa Karangtalun terus berbenah untuk mewujudkan desa yang mandiri, transparan, dan sejahtera bagi seluruh warganya."
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/profil-desa/overview",
								className: "btn btn--primary about__cta",
								id: "about-cta-selengkapnya",
								children: "Selengkapnya"
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "about__visual",
						children: /* @__PURE__ */ jsx("img", {
							src: "/assets/hero-desa.jpg",
							alt: "Hamparan sawah di Desa Karangtalun",
							className: "about__img",
							loading: "lazy"
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "layanan section section--gray",
				"aria-label": "Layanan informasi desa",
				children: /* @__PURE__ */ jsxs("div", {
					className: "container",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "section-header",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "section-label",
								children: "Jelajahi"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "section-title",
								children: "Layanan Informasi"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "section-desc",
								children: "Temukan berbagai informasi tentang Desa Karangtalun di sini."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "layanan__grid",
						children: LAYANAN.map((item) => /* @__PURE__ */ jsxs(Link, {
							to: item.href,
							className: `layanan__card layanan__card--${item.color}`,
							id: `layanan-${item.id}`,
							children: [
								/* @__PURE__ */ jsx(Icon, {
									name: item.icon,
									className: "layanan__icon"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "layanan__title",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "layanan__desc",
									children: item.desc
								}),
								/* @__PURE__ */ jsx("span", {
									className: "layanan__arrow",
									"aria-hidden": "true",
									children: "Lihat detail →"
								})
							]
						}, item.id))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "dusun section",
				"aria-label": "Daftar dusun",
				children: /* @__PURE__ */ jsxs("div", {
					className: "container",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "section-header",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "section-label",
								children: "12 Dusun"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "section-title",
								children: "Profil Wilayah Dusun"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "section-desc",
								children: "Setiap dusun memiliki cerita, potensi, dan keunikan masing-masing."
							})
						]
					}), /* @__PURE__ */ jsx("ul", {
						className: "dusun__grid",
						role: "list",
						children: DUSUN_SLUGS.map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
							to: `/profil-desa/dusun/${d.slug}`,
							className: "dusun__card",
							id: `dusun-${d.slug}`,
							children: [/* @__PURE__ */ jsxs("span", {
								className: "dusun__name",
								children: ["Dusun ", d.label]
							}), /* @__PURE__ */ jsx("svg", {
								className: "dusun__chevron",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("path", { d: "m9 6 6 6-6 6" })
							})]
						}) }, d.slug))
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/layout/Header.jsx
/**
* Header — Komponen judul halaman yang reusable.
* Dipakai di dalam halaman individual untuk menampilkan judul + subtitle.
*
* Props:
* - title (string) — judul utama halaman, wajib
* - subtitle (string) — teks deskripsi di bawah judul, opsional
* - centered (bool) — pusatkan teks, default false
* - green (bool) — pakai latar belakang hijau muda, default false
*/
function Header({ title, subtitle, centered = false, green = false }) {
	return /* @__PURE__ */ jsx("header", {
		className: [
			"page-header",
			centered ? "page-header--centered" : "",
			green ? "page-header--green" : ""
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ jsxs("div", {
			className: "container page-header__inner",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "page-header__title",
				children: title
			}), subtitle && /* @__PURE__ */ jsx("p", {
				className: "page-header__subtitle",
				children: subtitle
			})]
		})
	});
}
//#endregion
//#region src/data/static/desa.js
/**
* src/data/static/desa.js
* Data statis umum mengenai Desa Karangtalun (Sejarah, Visi-Misi, Geografis, Kontak).
* 
* [COLLABORATOR NOTICE]
* Teman Anda (atau Anda) bisa langsung memperbarui isi teks di bawah ini
* jika data resmi desa sudah tersedia.
*/
var profilDesaData = {
	sejarah: {
		title: "Sejarah Desa Karangtalun",
		paragraphs: [
			"Desa Karangtalun memiliki sejarah panjang yang mengakar pada tradisi masyarakat agraris di Kabupaten Magelang. Didirikan oleh para sesepuh terdahulu yang membuka lahan hutan menjadi kawasan pemukiman dan pertanian subur, desa ini dinamakan 'Karangtalun' yang melambangkan pekarangan atau tanah subur yang luas dan produktif.",
			"Seiring berjalannya waktu, Desa Karangtalun berkembang dari sebuah pemukiman kecil menjadi pusat kemasyarakatan yang teratur. Masyarakat desa senantiasa menjunjung tinggi nilai gotong royong, kebudayaan lokal, dan keharmonisan hidup berdampingan dengan alam di lereng pegunungan.",
			"Kini, Karangtalun bertransformasi menjadi desa administratif yang modern dengan tetap mempertahankan karakteristik budayanya. Pembangunan infrastruktur secara berkala serta pembinaan potensi warga di 12 dusun menjadi prioritas utama demi kemajuan bersama."
		]
	},
	visiMisi: {
		visi: "Membangun Desa Karangtalun Kecamatan Ngluwar Magelang dalam Kebersamaan Menuju Penguatan Ekonomi Lokal Berbasis Ekonomi Kerakyatan demi Mewujudkan Masyarakat yang Mandiri, Aman, Sejahtera, Dinamis Berlandaskan Iman dan Taqwa",
		misi: [
			"Meningkatkan kualitas tata kelola pemerintahan desa yang bersih, transparan, dan responsif terhadap kebutuhan masyarakat.",
			"Mendorong kemandirian ekonomi desa melalui pembinaan UMKM, optimalisasi sektor pertanian, dan pengembangan potensi wisata lokal.",
			"Membangun dan memelihara infrastruktur desa yang merata, aman, dan menunjang mobilitas serta produktivitas warga.",
			"Melestarikan nilai-nilai kebudayaan lokal, kearifan lokal, serta memelihara kerukunan antarwarga di seluruh dusun.",
			"Meningkatkan kualitas pelayanan sosial, pendidikan dasar, dan kesehatan masyarakat desa."
		]
	},
	geografis: {
		title: "Letak Geografis",
		deskripsi: "Desa Karangtalun terletak di kawasan dataran tinggi Kabupaten Magelang, dikelilingi oleh pemandangan perbukitan yang hijau dan udara yang sejuk. Keadaan tanah yang subur menjadikan mayoritas wilayah desa ini dimanfaatkan sebagai lahan pertanian produktif dan perkebunan warga.",
		batasWilayah: {
			utara: "Desa A (Kecamatan X)",
			selatan: "Desa B (Kecamatan Y)",
			timur: "Desa C (Kecamatan Z)",
			barat: "Desa D (Kecamatan W)"
		}
	},
	kontak: {
		alamat: "Jl. Raya Karangtalun No. 1, Kecamatan Karangtalun, Kabupaten Magelang, Jawa Tengah",
		telepon: "+62 812-3456-7890",
		email: "ngluwarkarangtalun@gmail.com",
		jamPelayanan: "Senin - Jumat, 08:00 - 15:00 WIB"
	}
};
//#endregion
//#region src/pages/profil-desa/Overview.jsx
function Overview() {
	const { sejarah, visiMisi, geografis, kontak } = profilDesaData;
	return /* @__PURE__ */ jsxs("div", {
		className: "overview",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Overview Desa",
				description: "Mengenal sejarah, visi misi, letak geografis, dan informasi pelayanan kantor Desa Karangtalun, Kabupaten Magelang, Jawa Tengah."
			}),
			/* @__PURE__ */ jsx(Header, {
				title: "Profil Umum Desa",
				subtitle: "Mengenal lebih dekat sejarah, visi, misi, letak geografis, dan informasi pelayanan Desa Karangtalun.",
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container overview__content",
				children: [
					/* @__PURE__ */ jsx("section", {
						className: "overview-section",
						"aria-labelledby": "sejarah-title",
						children: /* @__PURE__ */ jsxs("div", {
							className: "overview-grid",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "overview-section__text",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "overview-section__badge",
										children: "Asal-Usul"
									}),
									/* @__PURE__ */ jsx("h2", {
										id: "sejarah-title",
										className: "overview-section__title",
										children: sejarah.title
									}),
									sejarah.paragraphs.map((paragraph, index) => /* @__PURE__ */ jsx("p", {
										className: "overview-section__p",
										children: paragraph
									}, index))
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "overview-section__visual",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "overview-section__card",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "overview-section__card-icon",
											children: "📜"
										}),
										/* @__PURE__ */ jsx("h3", { children: "Warisan Budaya" }),
										/* @__PURE__ */ jsx("p", { children: "Menjaga nilai gotong royong dan tradisi warisan leluhur secara turun-temurun." })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "overview-section__card",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "overview-section__card-icon",
											children: "🌾"
										}),
										/* @__PURE__ */ jsx("h3", { children: "Tanah Subur" }),
										/* @__PURE__ */ jsx("p", { children: "Memiliki alam yang melimpah dan lahan tani produktif penyokong ekonomi desa." })
									]
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsx("hr", { className: "overview__divider" }),
					/* @__PURE__ */ jsxs("section", {
						className: "overview-section",
						"aria-labelledby": "visimisi-title",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "overview-section__header-center",
								children: [/* @__PURE__ */ jsx("span", {
									className: "overview-section__badge",
									children: "Arah Juang"
								}), /* @__PURE__ */ jsx("h2", {
									id: "visimisi-title",
									className: "overview-section__title",
									children: "Visi & Misi Desa"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "visi-box",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "visi-box__quote-icon",
										children: "“"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "visi-box__title",
										children: "Visi Desa"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "visi-box__text",
										children: visiMisi.visi
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "misi-list",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "misi-list__title",
									children: "Misi Desa"
								}), /* @__PURE__ */ jsx("ol", {
									className: "misi-list__grid",
									role: "list",
									children: visiMisi.misi.map((m, index) => /* @__PURE__ */ jsxs("li", {
										className: "misi-item",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "misi-item__number",
											"aria-hidden": "true",
											children: ["0", index + 1]
										}), /* @__PURE__ */ jsx("p", {
											className: "misi-item__text",
											children: m
										})]
									}, index))
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("hr", { className: "overview__divider" }),
					/* @__PURE__ */ jsxs("div", {
						className: "overview-bottom-grid",
						children: [/* @__PURE__ */ jsxs("section", {
							className: "overview-section card-style",
							"aria-labelledby": "geografis-title",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "overview-section__badge",
									children: "Peta & Batas"
								}),
								/* @__PURE__ */ jsx("h2", {
									id: "geografis-title",
									className: "overview-section__title",
									children: geografis.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "overview-section__p",
									children: geografis.deskripsi
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "borders-box",
									children: [/* @__PURE__ */ jsx("h3", { children: "Batas Wilayah:" }), /* @__PURE__ */ jsxs("ul", {
										className: "borders-list",
										role: "list",
										children: [
											/* @__PURE__ */ jsxs("li", { children: [
												/* @__PURE__ */ jsx("strong", { children: "Utara:" }),
												" ",
												geografis.batasWilayah.utara
											] }),
											/* @__PURE__ */ jsxs("li", { children: [
												/* @__PURE__ */ jsx("strong", { children: "Selatan:" }),
												" ",
												geografis.batasWilayah.selatan
											] }),
											/* @__PURE__ */ jsxs("li", { children: [
												/* @__PURE__ */ jsx("strong", { children: "Timur:" }),
												" ",
												geografis.batasWilayah.timur
											] }),
											/* @__PURE__ */ jsxs("li", { children: [
												/* @__PURE__ */ jsx("strong", { children: "Barat:" }),
												" ",
												geografis.batasWilayah.barat
											] })
										]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("section", {
							className: "overview-section card-style",
							"aria-labelledby": "kontak-title",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "overview-section__badge",
									children: "Hubungi Kami"
								}),
								/* @__PURE__ */ jsx("h2", {
									id: "kontak-title",
									className: "overview-section__title",
									children: "Kontak & Jam Layanan"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "contact-details",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "contact-item",
											children: [/* @__PURE__ */ jsx("span", {
												className: "contact-item__icon",
												"aria-hidden": "true",
												children: "📍"
											}), /* @__PURE__ */ jsxs("div", {
												className: "contact-item__text",
												children: [/* @__PURE__ */ jsx("h3", { children: "Alamat Kantor Desa" }), /* @__PURE__ */ jsx("p", { children: kontak.alamat })]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "contact-item",
											children: [/* @__PURE__ */ jsx("span", {
												className: "contact-item__icon",
												"aria-hidden": "true",
												children: "📞"
											}), /* @__PURE__ */ jsxs("div", {
												className: "contact-item__text",
												children: [/* @__PURE__ */ jsx("h3", { children: "Telepon / WhatsApp" }), /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", {
													href: `tel:${kontak.telepon}`,
													children: kontak.telepon
												}) })]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "contact-item",
											children: [/* @__PURE__ */ jsx("span", {
												className: "contact-item__icon",
												"aria-hidden": "true",
												children: "✉️"
											}), /* @__PURE__ */ jsxs("div", {
												className: "contact-item__text",
												children: [/* @__PURE__ */ jsx("h3", { children: "Email Resmi" }), /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", {
													href: `mailto:${kontak.email}`,
													children: kontak.email
												}) })]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "contact-item",
											children: [/* @__PURE__ */ jsx("span", {
												className: "contact-item__icon",
												"aria-hidden": "true",
												children: "🕐"
											}), /* @__PURE__ */ jsxs("div", {
												className: "contact-item__text",
												children: [/* @__PURE__ */ jsx("h3", { children: "Jam Pelayanan Publik" }), /* @__PURE__ */ jsx("p", { children: kontak.jamPelayanan })]
											})]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "dusun section",
						"aria-label": "Daftar dusun",
						children: /* @__PURE__ */ jsxs("div", {
							className: "container",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "section-header",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "section-label",
										children: "12 Dusun"
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "section-title",
										children: "Profil Wilayah Dusun"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "section-desc",
										children: "Setiap dusun memiliki cerita, potensi, dan keunikan masing-masing."
									})
								]
							}), /* @__PURE__ */ jsx("ul", {
								className: "dusun__grid",
								role: "list",
								children: DUSUN_SLUGS.map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
									to: `/profil-desa/dusun/${d.slug}`,
									className: "dusun__card",
									id: `dusun-${d.slug}`,
									children: [/* @__PURE__ */ jsxs("span", {
										className: "dusun__name",
										children: ["Dusun ", d.label]
									}), /* @__PURE__ */ jsx("svg", {
										className: "dusun__chevron",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("path", { d: "m9 6 6 6-6 6" })
									})]
								}) }, d.slug))
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/loadDusunData.js
/**
* loadDusunData.js
* Helper untuk membaca dan memproses semua file markdown di src/data/dusun/
* Menggunakan fitur import.meta.glob dari Vite (PRD §6.3).
*/
var mdFiles = /* #__PURE__ */ Object.assign({
	"/src/data/dusun/_template.md": "---\nnama: \"Nama Dusun\"\nslug: \"nama-dusun\"\nkepala_dusun: \"Nama Lengkap Kepala Dusun\"\njumlah_penduduk: 0\numkm:\n  - nama: \"Nama UMKM\"\n    deskripsi: \"Deskripsi singkat usaha ini\"\n    foto: \"/assets/dusun/nama-dusun/umkm-1.jpg\"\ngaleri:\n  - \"/assets/dusun/nama-dusun/kegiatan-1.jpg\"\n  - \"/assets/dusun/nama-dusun/kegiatan-2.jpg\"\n---\n\n## Sejarah Dusun\n\nTulis narasi sejarah dusun di sini. Bisa sepanjang yang diinginkan, format Markdown biasa.\n\n## Potensi & Keunikan\n\nTulis potensi, keunikan, atau hal menarik dari dusun ini.\n",
	"/src/data/dusun/jampiroso.md": "---\nnama: \"Jampiroso\"\nslug: \"jampiroso\"\nkepala_dusun: \"Bapak Sutrisno (Data Sementara)\"\njumlah_penduduk: 420\numkm:\n  - nama: \"Keripik Singkong Renyah Jampiroso\"\n    deskripsi: \"Produksi olahan singkong lokal dengan bumbu alami rahasia turun-temurun.\"\n    foto: \"/assets/hero-desa.jpg\"\n  - nama: \"Kerajinan Anyaman Bambu\"\n    deskripsi: \"Kerajinan tangan berupa besek, tampah, dan kursi bambu berkualitas tinggi.\"\n    foto: \"/assets/hero-desa.jpg\"\ngaleri:\n  - \"/assets/hero-desa.jpg\"\n  - \"/assets/hero-desa.jpg\"\n---\n\n## Sejarah & Gambaran Umum\n\nDusun **Jampiroso** merupakan salah satu dusun yang aktif dan produktif di Desa Karangtalun. Terletak di area yang dikelilingi persawahan subur dan kebun tanaman keras, masyarakat Jampiroso sangat bergantung pada sektor pertanian dan industri kerajinan rumahan (UMKM).\n\nSuasana di dusun ini terkenal sejuk, asri, dan warganya sangat menjunjung tinggi kebersamaan. Setiap kegiatan desa maupun dusun selalu dikerjakan melalui budaya *gotong royong* atau sambatan.\n\n## Potensi & Keunggulan Dusun\n\n1. **Sentra UMKM Olahan Pangan**: Jampiroso terkenal dengan hasil ketela pohon dan olahan makanan ringannya yang telah dipasarkan hingga ke luar desa.\n2. **Kelompok Tani Aktif**: Adanya pembinaan rutin bagi para petani lokal dalam mengelola irigasi dan pupuk organik demi menjaga kualitas panen sawah.\n3. **Tradisi Seni & Budaya**: Warga Jampiroso secara berkala mengadakan pentas kesenian tradisional desa sebagai wadah kreativitas pemuda-pemudi dusun.\n"
});
/**
* Mendapatkan semua data dusun yang valid (mengabaikan file yang diawali underscore seperti _template.md)
* @returns {Array<{ slug: string, frontmatter: Object, content: string }>}
*/
function getAllDusun() {
	const dusunList = [];
	for (const [path, rawContent] of Object.entries(mdFiles)) {
		const fileName = path.split("/").pop();
		if (fileName.startsWith("_")) continue;
		try {
			const { data: frontmatter, content } = matter(rawContent);
			const slug = frontmatter.slug || fileName.replace(/\.md$/, "");
			dusunList.push({
				slug,
				frontmatter,
				content
			});
		} catch (err) {
			console.error(`[loadDusunData] Gagal memparsing file: ${path}`, err);
		}
	}
	return dusunList;
}
/**
* Mendapatkan data satu dusun berdasarkan slug
* @param {string} slug 
* @returns {Object|null} { slug, frontmatter, content } atau null jika belum dibuat
*/
function getDusunBySlug(slug) {
	return getAllDusun().find((d) => d.slug === slug) || null;
}
/**
* Daftar semua slug standar 12 dusun di Desa Karangtalun
* Dipakai untuk validasi atau pembuatan skeleton di UI
*/
var ALL_DUSUN_SLUGS = [
	{
		slug: "baran",
		label: "Baran"
	},
	{
		slug: "dangkel-kulon",
		label: "Dangkel Kulon"
	},
	{
		slug: "dangkel-wetan",
		label: "Dangkel Wetan"
	},
	{
		slug: "jambon",
		label: "Jambon"
	},
	{
		slug: "jampiroso",
		label: "Jampiroso"
	},
	{
		slug: "jangkang",
		label: "Jangkang"
	},
	{
		slug: "jangkang-a",
		label: "Jangkang A"
	},
	{
		slug: "jangkang-b",
		label: "Jangkang B"
	},
	{
		slug: "joho",
		label: "Joho"
	},
	{
		slug: "kajoran",
		label: "Kajoran"
	},
	{
		slug: "karangtalun",
		label: "Karangtalun"
	},
	{
		slug: "selingan",
		label: "Selingan"
	}
];
//#endregion
//#region src/pages/profil-desa/Dusun.jsx
function Dusun() {
	const { slug } = useParams();
	const dusunData = getDusunBySlug(slug);
	const standardInfo = ALL_DUSUN_SLUGS.find((d) => d.slug === slug);
	const dusunName = dusunData?.frontmatter?.nama || standardInfo?.label || slug;
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);
	const getSeoImage = () => {
		if (!dusunData?.frontmatter) return "/assets/hero-desa.jpg";
		const { umkm, galeri } = dusunData.frontmatter;
		if (umkm && umkm.length > 0 && umkm[0].foto) return umkm[0].foto;
		if (galeri && galeri.length > 0) return galeri[0];
		return "/assets/hero-desa.jpg";
	};
	const getSeoDescription = () => {
		if (!dusunData) return `Profil wilayah Dusun ${dusunName}, Desa Karangtalun. Halaman sedang dalam tahap pengumpulan data oleh tim kontributor KKN.`;
		const { content } = dusunData;
		const plainText = content.replace(/#+\s/g, "").replace(/\*\*/g, "").replace(/\n/g, " ").trim();
		return (plainText.length > 160 ? plainText.slice(0, 157) + "..." : plainText) || `Profil wilayah, potensi UMKM, dan kegiatan warga di Dusun ${dusunName}, Desa Karangtalun.`;
	};
	const seoTitle = `Dusun ${dusunName}`;
	const seoDescription = getSeoDescription();
	const seoImage = getSeoImage();
	if (!dusunData) return /* @__PURE__ */ jsxs("div", {
		className: "dusun-page",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: seoTitle,
				description: seoDescription
			}),
			/* @__PURE__ */ jsx(Header, {
				title: `Dusun ${dusunName}`,
				subtitle: "Profil Wilayah Dusun — Desa Karangtalun",
				green: false
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container dusun-page__skeleton-wrap",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "skeleton-card",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "skeleton-card__icon",
							"aria-hidden": "true",
							children: "🚧"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "skeleton-card__title",
							children: "Data Sedang Dipersiapkan"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "skeleton-card__desc",
							children: [
								"Halaman profil untuk ",
								/* @__PURE__ */ jsxs("strong", { children: ["Dusun ", dusunName] }),
								" saat ini masih dalam tahap pengumpulan data dan penulisan oleh tim kontributor KKN."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "skeleton-card__steps",
							children: [/* @__PURE__ */ jsx("span", {
								className: "skeleton-badge",
								children: "Info Kolaborator"
							}), /* @__PURE__ */ jsxs("p", { children: [
								"Untuk mengisi halaman ini, salin file ",
								/* @__PURE__ */ jsx("code", { children: "src/data/dusun/_template.md" }),
								" menjadi",
								" ",
								/* @__PURE__ */ jsxs("code", { children: [slug, ".md"] }),
								" di folder yang sama."
							] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "skeleton-card__actions",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/profil-desa/overview",
								className: "btn btn--primary",
								children: "← Kembali ke Overview Desa"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/profil-desa/dusun/jampiroso",
								className: "btn btn--outline-dark",
								children: "Lihat Contoh (Jampiroso)"
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "other-dusun-nav",
					children: [/* @__PURE__ */ jsx("h3", { children: "Jelajahi Dusun Lainnya" }), /* @__PURE__ */ jsx("div", {
						className: "other-dusun-grid",
						children: ALL_DUSUN_SLUGS.map((d) => /* @__PURE__ */ jsxs(Link, {
							to: `/profil-desa/dusun/${d.slug}`,
							className: `other-dusun-pill ${d.slug === slug ? "other-dusun-pill--active" : ""}`,
							children: ["🌿 ", d.label]
						}, d.slug))
					})]
				})]
			})
		]
	});
	const { frontmatter, content } = dusunData;
	return /* @__PURE__ */ jsxs("div", {
		className: "dusun-page",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: seoTitle,
				description: seoDescription,
				image: seoImage
			}),
			/* @__PURE__ */ jsx(Header, {
				title: `Dusun ${frontmatter.nama}`,
				subtitle: `Profil Wilayah, Potensi UMKM, dan Kegiatan Warga di Dusun ${frontmatter.nama}`,
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container dusun-page__content",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "dusun-stats-grid",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "dusun-stat-card",
							children: [/* @__PURE__ */ jsx("span", {
								className: "dusun-stat-card__icon",
								children: "👤"
							}), /* @__PURE__ */ jsxs("div", {
								className: "dusun-stat-card__info",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label",
									children: "Kepala Dusun"
								}), /* @__PURE__ */ jsx("strong", {
									className: "value",
									children: frontmatter.kepala_dusun || "—"
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "dusun-stat-card",
							children: [/* @__PURE__ */ jsx("span", {
								className: "dusun-stat-card__icon",
								children: "👥"
							}), /* @__PURE__ */ jsxs("div", {
								className: "dusun-stat-card__info",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label",
									children: "Estimasi Penduduk"
								}), /* @__PURE__ */ jsx("strong", {
									className: "value",
									children: frontmatter.jumlah_penduduk ? `${frontmatter.jumlah_penduduk} Jiwa` : "—"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("hr", { className: "dusun-divider" }),
					/* @__PURE__ */ jsx("article", {
						className: "dusun-article markdown-body",
						children: /* @__PURE__ */ jsx(ReactMarkdown, { children: content })
					}),
					frontmatter.umkm && frontmatter.umkm.length > 0 && /* @__PURE__ */ jsxs("section", {
						className: "dusun-section",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "dusun-section__header",
							children: [/* @__PURE__ */ jsx("span", {
								className: "section-badge",
								children: "Potensi Lokal"
							}), /* @__PURE__ */ jsx("h2", { children: "UMKM & Produk Unggulan" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "umkm-grid",
							children: frontmatter.umkm.map((item, idx) => /* @__PURE__ */ jsxs("div", {
								className: "umkm-card",
								children: [/* @__PURE__ */ jsx("div", {
									className: "umkm-card__img-wrap",
									children: /* @__PURE__ */ jsx("img", {
										src: item.foto || "/assets/hero-desa.jpg",
										alt: item.nama,
										loading: "lazy"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "umkm-card__body",
									children: [/* @__PURE__ */ jsx("h3", { children: item.nama }), /* @__PURE__ */ jsx("p", { children: item.deskripsi })]
								})]
							}, idx))
						})]
					}),
					frontmatter.galeri && frontmatter.galeri.length > 0 && /* @__PURE__ */ jsxs("section", {
						className: "dusun-section",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "dusun-section__header",
							children: [/* @__PURE__ */ jsx("span", {
								className: "section-badge",
								children: "Dokumentasi"
							}), /* @__PURE__ */ jsx("h2", { children: "Galeri Kegiatan Dusun" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "dusun-galeri-grid",
							children: frontmatter.galeri.map((foto, idx) => /* @__PURE__ */ jsx("div", {
								className: "dusun-galeri-item",
								children: /* @__PURE__ */ jsx("img", {
									src: foto,
									alt: `Dokumentasi ${frontmatter.nama} ${idx + 1}`,
									loading: "lazy"
								})
							}, idx))
						})]
					}),
					/* @__PURE__ */ jsx("hr", { className: "dusun-divider" }),
					/* @__PURE__ */ jsxs("div", {
						className: "other-dusun-nav",
						children: [/* @__PURE__ */ jsx("h3", { children: "Jelajahi Dusun Lainnya di Karangtalun" }), /* @__PURE__ */ jsx("div", {
							className: "other-dusun-grid",
							children: ALL_DUSUN_SLUGS.map((d) => /* @__PURE__ */ jsxs(Link, {
								to: `/profil-desa/dusun/${d.slug}`,
								className: `other-dusun-pill ${d.slug === slug ? "other-dusun-pill--active" : ""}`,
								children: ["🌿 ", d.label]
							}, d.slug))
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/data/static/struktur-organisasi.js
/**
* Data Struktur Organisasi Perangkat Desa Karangtalun
* 
* File ini berisi data perangkat desa untuk ditampilkan di halaman
* /pemerintahan/struktur-organisasi
* 
* Format data disesuaikan dengan bagan organisasi pemerintahan desa standar:
* - Kepala Desa (top level)
* - Sekretaris Desa
* - Kepala Urusan (Kaur) - Finance, General Affairs, Planning
* - Kepala Seksi (Kasi) - Government, Welfare, Services
* - Kepala Dusun (12 dusun)
* 
* TODO: Isi data sesuai struktur perangkat desa yang sebenarnya
*/
var strukturOrganisasi = {
	kepalaDesa: {
		nama: "[Nama Kepala Desa]",
		jabatan: "Kepala Desa",
		foto: null,
		niap: null
	},
	sekretarisDesa: {
		nama: "[Nama Sekretaris Desa]",
		jabatan: "Sekretaris Desa",
		foto: null,
		niap: null
	},
	kepalaUrusan: [
		{
			id: "kaur-keuangan",
			nama: "[Nama Kaur Keuangan]",
			jabatan: "Kaur Keuangan",
			singkatan: "Kaur Keuangan",
			foto: null,
			niap: null
		},
		{
			id: "kaur-umum",
			nama: "[Nama Kaur Umum]",
			jabatan: "Kaur Umum dan Tata Usaha",
			singkatan: "Kaur Umum",
			foto: null,
			niap: null
		},
		{
			id: "kaur-perencanaan",
			nama: "[Nama Kaur Perencanaan]",
			jabatan: "Kaur Perencanaan",
			singkatan: "Kaur Perencanaan",
			foto: null,
			niap: null
		}
	],
	kepalaSeksi: [
		{
			id: "kasi-pemerintahan",
			nama: "[Nama Kasi Pemerintahan]",
			jabatan: "Kasi Pemerintahan",
			singkatan: "Kasi Pemerintahan",
			foto: null,
			niap: null
		},
		{
			id: "kasi-kesejahteraan",
			nama: "[Nama Kasi Kesejahteraan]",
			jabatan: "Kasi Kesejahteraan",
			singkatan: "Kasi Kesejahteraan",
			foto: null,
			niap: null
		},
		{
			id: "kasi-pelayanan",
			nama: "[Nama Kasi Pelayanan]",
			jabatan: "Kasi Pelayanan",
			singkatan: "Kasi Pelayanan",
			foto: null,
			niap: null
		}
	],
	kepalaDusun: [
		{
			id: "baran",
			nama: "[Nama Kadus]",
			dusun: "Baran",
			foto: null
		},
		{
			id: "dangkel-kulon",
			nama: "[Nama Kadus]",
			dusun: "Dangkel Kulon",
			foto: null
		},
		{
			id: "dangkel-wetan",
			nama: "[Nama Kadus]",
			dusun: "Dangkel Wetan",
			foto: null
		},
		{
			id: "jambon",
			nama: "[Nama Kadus]",
			dusun: "Jambon",
			foto: null
		},
		{
			id: "jampiroso",
			nama: "[Nama Kadus]",
			dusun: "Jampiroso",
			foto: null
		},
		{
			id: "jangkang",
			nama: "[Nama Kadus]",
			dusun: "Jangkang",
			foto: null
		},
		{
			id: "jangkang-a",
			nama: "[Nama Kadus]",
			dusun: "Jangkang A",
			foto: null
		},
		{
			id: "jangkang-b",
			nama: "[Nama Kadus]",
			dusun: "Jangkang B",
			foto: null
		},
		{
			id: "joho",
			nama: "[Nama Kadus]",
			dusun: "Joho",
			foto: null
		},
		{
			id: "kajoran",
			nama: "[Nama Kadus]",
			dusun: "Kajoran",
			foto: null
		},
		{
			id: "karangtalun",
			nama: "[Nama Kadus]",
			dusun: "Karangtalun",
			foto: null
		},
		{
			id: "selingan",
			nama: "[Nama Kadus]",
			dusun: "Selingan",
			foto: null
		}
	]
};
//#endregion
//#region src/pages/pemerintahan/StrukturOrganisasi.jsx
function StrukturOrganisasi() {
	const { kepalaDesa, sekretarisDesa, kepalaUrusan, kepalaSeksi, kepalaDusun } = strukturOrganisasi;
	return /* @__PURE__ */ jsxs("div", {
		className: "struktur-organisasi",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Struktur Organisasi",
				description: "Bagan struktur organisasi dan susunan perangkat Pemerintahan Desa Karangtalun, Kabupaten Magelang, Jawa Tengah."
			}),
			/* @__PURE__ */ jsx(Header, {
				title: "Struktur Organisasi",
				subtitle: "Susunan Perangkat Pemerintahan Desa Karangtalun",
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container struktur-org__content",
				children: [
					/* @__PURE__ */ jsx("section", {
						className: "struktur-org__intro",
						children: /* @__PURE__ */ jsx("p", {
							className: "struktur-org__intro-text",
							children: "Struktur organisasi pemerintahan Desa Karangtalun mengikuti ketentuan peraturan perundang-undangan yang berlaku, dengan Kepala Desa sebagai pimpinan tertinggi yang dibantu oleh Sekretaris Desa, Kepala Urusan, Kepala Seksi, dan Kepala Dusun."
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "org-chart",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "org-level org-level--1",
								children: /* @__PURE__ */ jsxs("div", {
									className: "org-card org-card--kades",
									children: [/* @__PURE__ */ jsx("div", {
										className: "org-card__icon",
										children: "👤"
									}), /* @__PURE__ */ jsxs("div", {
										className: "org-card__content",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "org-card__nama",
											children: kepalaDesa.nama
										}), /* @__PURE__ */ jsx("p", {
											className: "org-card__jabatan",
											children: kepalaDesa.jabatan
										})]
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "org-connector org-connector--vertical",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "org-level org-level--2",
								children: /* @__PURE__ */ jsxs("div", {
									className: "org-card org-card--sekdes",
									children: [/* @__PURE__ */ jsx("div", {
										className: "org-card__icon",
										children: "📋"
									}), /* @__PURE__ */ jsxs("div", {
										className: "org-card__content",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "org-card__nama",
											children: sekretarisDesa.nama
										}), /* @__PURE__ */ jsx("p", {
											className: "org-card__jabatan",
											children: sekretarisDesa.jabatan
										})]
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "org-connector org-connector--vertical",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "org-level org-level--3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "org-subsection",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "org-subsection__title",
										children: "Kepala Urusan"
									}), /* @__PURE__ */ jsx("div", {
										className: "org-card-grid org-card-grid--kaur",
										children: kepalaUrusan.map((kaur) => /* @__PURE__ */ jsxs("div", {
											className: "org-card org-card--kaur",
											children: [/* @__PURE__ */ jsx("div", {
												className: "org-card__icon",
												children: "💼"
											}), /* @__PURE__ */ jsxs("div", {
												className: "org-card__content",
												children: [/* @__PURE__ */ jsx("h3", {
													className: "org-card__nama",
													children: kaur.nama
												}), /* @__PURE__ */ jsx("p", {
													className: "org-card__jabatan",
													children: kaur.singkatan
												})]
											})]
										}, kaur.id))
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "org-subsection",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "org-subsection__title",
										children: "Kepala Seksi"
									}), /* @__PURE__ */ jsx("div", {
										className: "org-card-grid org-card-grid--kasi",
										children: kepalaSeksi.map((kasi) => /* @__PURE__ */ jsxs("div", {
											className: "org-card org-card--kasi",
											children: [/* @__PURE__ */ jsx("div", {
												className: "org-card__icon",
												children: "🏢"
											}), /* @__PURE__ */ jsxs("div", {
												className: "org-card__content",
												children: [/* @__PURE__ */ jsx("h3", {
													className: "org-card__nama",
													children: kasi.nama
												}), /* @__PURE__ */ jsx("p", {
													className: "org-card__jabatan",
													children: kasi.singkatan
												})]
											})]
										}, kasi.id))
									})]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "org-connector org-connector--vertical",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "org-level org-level--4",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "org-subsection__title",
									children: "Kepala Dusun (12 Dusun)"
								}), /* @__PURE__ */ jsx("div", {
									className: "org-card-grid org-card-grid--kadus",
									children: kepalaDusun.map((kadus) => /* @__PURE__ */ jsxs("div", {
										className: "org-card org-card--kadus",
										children: [/* @__PURE__ */ jsx("div", {
											className: "org-card__icon",
											children: "🌿"
										}), /* @__PURE__ */ jsxs("div", {
											className: "org-card__content",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "org-card__nama",
												children: kadus.nama
											}), /* @__PURE__ */ jsxs("p", {
												className: "org-card__jabatan",
												children: ["Dusun ", kadus.dusun]
											})]
										})]
									}, kadus.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "struktur-org__note",
						children: /* @__PURE__ */ jsxs("div", {
							className: "note-card",
							children: [/* @__PURE__ */ jsx("span", {
								className: "note-card__icon",
								children: "ℹ️"
							}), /* @__PURE__ */ jsxs("div", {
								className: "note-card__content",
								children: [/* @__PURE__ */ jsx("h3", { children: "Catatan Data" }), /* @__PURE__ */ jsx("p", { children: "Data di atas adalah struktur organisasi sementara yang akan diperbarui secara berkala. Untuk informasi lebih lanjut atau konfirmasi data terbaru, silakan hubungi Kantor Desa Karangtalun." })]
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/data/static/statistik-kependudukan.js
/**
* statistik-kependudukan.js — Data kependudukan Desa Karangtalun
*
* Sumber data:
*  - Website resmi Desa Karangtalun (Sistem Informasi Desa / SID Kab. Magelang)
*  - Publikasi referensi: Kecamatan Ngluwar Dalam Angka, BPS Kab. Magelang
*
* Catatan: Data per-dusun (kelompok umur, pendidikan, pekerjaan) merupakan estimasi
* proporsional berdasarkan data agregat desa. Perbarui dengan monografi desa terbaru
* jika tersedia data resmi per dusun yang lebih detail.
*
* Terakhir diperbarui: Juli 2024
*/
var summaryDesa = {
	totalJiwa: 3350,
	totalKK: 1110,
	lakiLaki: 1672,
	perempuan: 1678,
	sexRatio: 99.6,
	jumlahRt: 43,
	jumlahRw: 21,
	jumlahDusun: 10,
	luasWilayah: "—",
	kepadatan: "—",
	sumberData: "Sistem Informasi Desa (SID) Kab. Magelang",
	tahunData: 2024
};
var dataJenisKelamin = [{
	name: "Laki-Laki",
	value: 1672,
	fill: "#96D539"
}, {
	name: "Perempuan",
	value: 1678,
	fill: "#1B4332"
}];
var dataKelompokUmur = [
	{
		umur: "0–4",
		laki: 98,
		perempuan: 95
	},
	{
		umur: "5–9",
		laki: 126,
		perempuan: 121
	},
	{
		umur: "10–14",
		laki: 133,
		perempuan: 128
	},
	{
		umur: "15–19",
		laki: 129,
		perempuan: 124
	},
	{
		umur: "20–24",
		laki: 118,
		perempuan: 115
	},
	{
		umur: "25–29",
		laki: 112,
		perempuan: 118
	},
	{
		umur: "30–34",
		laki: 124,
		perempuan: 129
	},
	{
		umur: "35–39",
		laki: 121,
		perempuan: 126
	},
	{
		umur: "40–44",
		laki: 114,
		perempuan: 119
	},
	{
		umur: "45–49",
		laki: 109,
		perempuan: 114
	},
	{
		umur: "50–54",
		laki: 98,
		perempuan: 103
	},
	{
		umur: "55–59",
		laki: 86,
		perempuan: 94
	},
	{
		umur: "60+",
		laki: 124,
		perempuan: 172
	}
];
var dataPendidikan = [
	{
		label: "Belum / Tidak Sekolah",
		jumlah: 285
	},
	{
		label: "SD / Sederajat",
		jumlah: 1020
	},
	{
		label: "SMP / Sederajat",
		jumlah: 720
	},
	{
		label: "SMA / Sederajat",
		jumlah: 870
	},
	{
		label: "D3 / S1 ke atas",
		jumlah: 295
	},
	{
		label: "Tidak Sekolah",
		jumlah: 160
	}
];
var dataPekerjaan = [
	{
		label: "Petani / Buruh Tani",
		jumlah: 680
	},
	{
		label: "Karyawan Swasta",
		jumlah: 420
	},
	{
		label: "Buruh Harian Lepas",
		jumlah: 310
	},
	{
		label: "Pedagang / Wiraswasta",
		jumlah: 265
	},
	{
		label: "PNS / TNI / Polri",
		jumlah: 75
	},
	{
		label: "Pelajar / Mahasiswa",
		jumlah: 540
	},
	{
		label: "Belum / Tidak Bekerja",
		jumlah: 380
	},
	{
		label: "Lainnya",
		jumlah: 310
	}
];
var statistikPerDusun = [
	{
		slug: "baran",
		nama: "Baran",
		jiwa: 151,
		kk: 47,
		rt: 2,
		rw: 1,
		laki: 75,
		perempuan: 76,
		umurProduktif: 89,
		lansia: 20,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 75,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 76,
			fill: "#1B4332"
		}]
	},
	{
		slug: "dangkel-kulon",
		nama: "Dangkel Kulon",
		jiwa: 287,
		kk: 93,
		rt: 10,
		rw: 4,
		laki: 143,
		perempuan: 144,
		umurProduktif: 170,
		lansia: 38,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 143,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 144,
			fill: "#1B4332"
		}]
	},
	{
		slug: "dangkel-wetan",
		nama: "Dangkel Wetan",
		jiwa: 533,
		kk: 178,
		rt: 8,
		rw: 3,
		laki: 266,
		perempuan: 267,
		umurProduktif: 316,
		lansia: 72,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 266,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 267,
			fill: "#1B4332"
		}]
	},
	{
		slug: "jambon",
		nama: "Jambon",
		jiwa: 445,
		kk: 155,
		rt: 6,
		rw: 2,
		laki: 222,
		perempuan: 223,
		umurProduktif: 264,
		lansia: 60,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 222,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 223,
			fill: "#1B4332"
		}]
	},
	{
		slug: "jampiroso",
		nama: "Jampiroso",
		jiwa: 340,
		kk: 112,
		rt: 4,
		rw: 1,
		laki: 170,
		perempuan: 170,
		umurProduktif: 202,
		lansia: 46,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 170,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 170,
			fill: "#1B4332"
		}]
	},
	{
		slug: "jangkang",
		nama: "Jangkang",
		jiwa: 67,
		kk: 25,
		rt: 4,
		rw: 1,
		laki: 33,
		perempuan: 34,
		umurProduktif: 40,
		lansia: 9,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 33,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 34,
			fill: "#1B4332"
		}]
	},
	{
		slug: "jangkang-a",
		nama: "Jangkang A",
		jiwa: 288,
		kk: 101,
		rt: 3,
		rw: 1,
		laki: 144,
		perempuan: 144,
		umurProduktif: 171,
		lansia: 39,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 144,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 144,
			fill: "#1B4332"
		}]
	},
	{
		slug: "jangkang-b",
		nama: "Jangkang B",
		jiwa: 305,
		kk: 93,
		rt: 5,
		rw: 2,
		laki: 152,
		perempuan: 153,
		umurProduktif: 181,
		lansia: 41,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 152,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 153,
			fill: "#1B4332"
		}]
	},
	{
		slug: "joho",
		nama: "Joho",
		jiwa: 409,
		kk: 137,
		rt: 5,
		rw: 2,
		laki: 204,
		perempuan: 205,
		umurProduktif: 243,
		lansia: 55,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 204,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 205,
			fill: "#1B4332"
		}]
	},
	{
		slug: "kajoran",
		nama: "Kajoran",
		jiwa: 525,
		kk: 169,
		rt: 8,
		rw: 4,
		laki: 263,
		perempuan: 262,
		umurProduktif: 311,
		lansia: 71,
		jenisKelamin: [{
			name: "Laki-Laki",
			value: 263,
			fill: "#96D539"
		}, {
			name: "Perempuan",
			value: 262,
			fill: "#1B4332"
		}]
	}
];
//#endregion
//#region src/pages/pemerintahan/StatistikDesa.jsx
function CustomTooltip$1({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "chart-tooltip",
		children: [label && /* @__PURE__ */ jsx("p", {
			className: "chart-tooltip__label",
			children: label
		}), payload.map((p, i) => /* @__PURE__ */ jsxs("p", {
			style: { color: p.fill || p.color },
			children: [
				p.name,
				": ",
				/* @__PURE__ */ jsx("strong", { children: p.value.toLocaleString("id-ID") })
			]
		}, i))]
	});
}
function StatCard({ icon, value, label, sub, accent }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `stat-card ${accent ? "stat-card--accent" : ""}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "stat-card__icon",
				"aria-hidden": "true",
				children: icon
			}),
			/* @__PURE__ */ jsx("p", {
				className: "stat-card__value",
				children: typeof value === "number" ? value.toLocaleString("id-ID") : value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "stat-card__label",
				children: label
			}),
			sub && /* @__PURE__ */ jsx("p", {
				className: "stat-card__sub",
				children: sub
			})
		]
	});
}
function SectionTitle({ children, sub }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "section-heading",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "section-heading__title",
			children
		}), sub && /* @__PURE__ */ jsx("p", {
			className: "section-heading__sub",
			children: sub
		})]
	});
}
function StatistikDesa() {
	const { totalJiwa, totalKK, lakiLaki, perempuan, sexRatio, tahunData } = summaryDesa;
	return /* @__PURE__ */ jsxs("div", {
		className: "statistik-desa",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Statistik Kependudukan Desa",
				description: `Data statistik kependudukan Desa Karangtalun tahun ${tahunData} — jumlah jiwa, komposisi jenis kelamin, kelompok umur, pendidikan, dan mata pencaharian.`
			}),
			/* @__PURE__ */ jsx(Header, {
				title: "Statistik Kependudukan",
				subtitle: `Desa Karangtalun · Data Tahun ${tahunData}`,
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container statistik-desa__content",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "data-notice",
						role: "note",
						children: [/* @__PURE__ */ jsx("span", {
							className: "data-notice__icon",
							children: "⚠️"
						}), /* @__PURE__ */ jsxs("p", { children: [
							"Data bersifat ",
							/* @__PURE__ */ jsx("strong", { children: "sementara" }),
							" dan akan diperbarui setelah verifikasi dengan administrasi desa dan BPS Kabupaten Magelang."
						] })]
					}),
					/* @__PURE__ */ jsxs("section", {
						"aria-labelledby": "summary-title",
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							sub: "Ringkasan data kependudukan seluruh desa",
							children: "Ringkasan Data Desa"
						}), /* @__PURE__ */ jsxs("div", {
							className: "stat-cards-grid",
							children: [
								/* @__PURE__ */ jsx(StatCard, {
									icon: "👥",
									value: totalJiwa,
									label: "Total Jiwa",
									accent: true
								}),
								/* @__PURE__ */ jsx(StatCard, {
									icon: "🏠",
									value: totalKK,
									label: "Kepala Keluarga"
								}),
								/* @__PURE__ */ jsx(StatCard, {
									icon: "👨",
									value: lakiLaki,
									label: "Laki-Laki"
								}),
								/* @__PURE__ */ jsx(StatCard, {
									icon: "👩",
									value: perempuan,
									label: "Perempuan"
								}),
								/* @__PURE__ */ jsx(StatCard, {
									icon: "⚖️",
									value: `${sexRatio}`,
									label: "Sex Ratio",
									sub: "per 100 perempuan"
								}),
								/* @__PURE__ */ jsx(StatCard, {
									icon: "🏘️",
									value: 12,
									label: "Dusun"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "charts-row",
						"aria-labelledby": "demografi-title",
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							sub: "Komposisi penduduk berdasarkan jenis kelamin dan usia",
							children: "Demografi Penduduk"
						}), /* @__PURE__ */ jsxs("div", {
							className: "charts-row__grid",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "chart-card",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "chart-card__title",
									children: "Komposisi Jenis Kelamin"
								}), /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: 260,
									children: /* @__PURE__ */ jsxs(PieChart, { children: [
										/* @__PURE__ */ jsx(Pie, {
											data: dataJenisKelamin,
											dataKey: "value",
											nameKey: "name",
											cx: "50%",
											cy: "50%",
											innerRadius: 60,
											outerRadius: 100,
											paddingAngle: 4,
											label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`,
											labelLine: false,
											children: dataJenisKelamin.map((entry, i) => /* @__PURE__ */ jsx(Cell, { fill: entry.fill }, i))
										}),
										/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}) }),
										/* @__PURE__ */ jsx(Legend, {})
									] })
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "chart-card chart-card--wide",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "chart-card__title",
									children: "Kelompok Umur"
								}), /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: 260,
									children: /* @__PURE__ */ jsxs(BarChart, {
										data: dataKelompokUmur,
										margin: {
											top: 0,
											right: 8,
											left: -16,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ jsx(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}),
											/* @__PURE__ */ jsx(XAxis, {
												dataKey: "umur",
												tick: { fontSize: 11 }
											}),
											/* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11 } }),
											/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}) }),
											/* @__PURE__ */ jsx(Legend, {}),
											/* @__PURE__ */ jsx(Bar, {
												dataKey: "laki",
												name: "Laki-Laki",
												fill: "#96D539",
												radius: [
													3,
													3,
													0,
													0
												]
											}),
											/* @__PURE__ */ jsx(Bar, {
												dataKey: "perempuan",
												name: "Perempuan",
												fill: "#1B4332",
												radius: [
													3,
													3,
													0,
													0
												]
											})
										]
									})
								})]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "charts-row",
						"aria-labelledby": "sosial-title",
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							sub: "Tingkat pendidikan dan mata pencaharian warga desa",
							children: "Profil Sosial-Ekonomi"
						}), /* @__PURE__ */ jsxs("div", {
							className: "charts-row__grid",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "chart-card",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "chart-card__title",
									children: "Tingkat Pendidikan"
								}), /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: 260,
									children: /* @__PURE__ */ jsxs(BarChart, {
										data: dataPendidikan,
										layout: "vertical",
										margin: {
											top: 0,
											right: 16,
											left: 60,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ jsx(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)",
												horizontal: false
											}),
											/* @__PURE__ */ jsx(XAxis, {
												type: "number",
												tick: { fontSize: 11 }
											}),
											/* @__PURE__ */ jsx(YAxis, {
												type: "category",
												dataKey: "label",
												tick: { fontSize: 11 },
												width: 90
											}),
											/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}) }),
											/* @__PURE__ */ jsx(Bar, {
												dataKey: "jumlah",
												name: "Jumlah",
												fill: "#96D539",
												radius: [
													0,
													3,
													3,
													0
												]
											})
										]
									})
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "chart-card",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "chart-card__title",
									children: "Mata Pencaharian"
								}), /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: 260,
									children: /* @__PURE__ */ jsxs(BarChart, {
										data: dataPekerjaan,
										layout: "vertical",
										margin: {
											top: 0,
											right: 16,
											left: 70,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ jsx(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)",
												horizontal: false
											}),
											/* @__PURE__ */ jsx(XAxis, {
												type: "number",
												tick: { fontSize: 11 }
											}),
											/* @__PURE__ */ jsx(YAxis, {
												type: "category",
												dataKey: "label",
												tick: { fontSize: 11 },
												width: 110
											}),
											/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}) }),
											/* @__PURE__ */ jsx(Bar, {
												dataKey: "jumlah",
												name: "Jumlah",
												fill: "#1B4332",
												radius: [
													0,
													3,
													3,
													0
												]
											})
										]
									})
								})]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						"aria-labelledby": "tabel-dusun-title",
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							sub: "Ringkasan jumlah penduduk di setiap dusun",
							children: "Rekap Penduduk Per Dusun"
						}), /* @__PURE__ */ jsx("div", {
							className: "tabel-wrapper",
							children: /* @__PURE__ */ jsxs("table", {
								className: "tabel-dusun",
								"aria-label": "Data kependudukan per dusun",
								children: [
									/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", { children: "Dusun" }),
										/* @__PURE__ */ jsx("th", { children: "Jiwa" }),
										/* @__PURE__ */ jsx("th", { children: "KK" }),
										/* @__PURE__ */ jsx("th", { children: "Laki-Laki" }),
										/* @__PURE__ */ jsx("th", { children: "Perempuan" }),
										/* @__PURE__ */ jsx("th", { children: "Sex Ratio" })
									] }) }),
									/* @__PURE__ */ jsx("tbody", { children: statistikPerDusun.map((d) => /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: d.nama }) }),
										/* @__PURE__ */ jsx("td", { children: d.jiwa.toLocaleString("id-ID") }),
										/* @__PURE__ */ jsx("td", { children: d.kk.toLocaleString("id-ID") }),
										/* @__PURE__ */ jsx("td", { children: d.laki.toLocaleString("id-ID") }),
										/* @__PURE__ */ jsx("td", { children: d.perempuan.toLocaleString("id-ID") }),
										/* @__PURE__ */ jsx("td", { children: Math.round(d.laki / d.perempuan * 100) })
									] }, d.slug)) }),
									/* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: "Total Desa" }) }),
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: totalJiwa.toLocaleString("id-ID") }) }),
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: totalKK.toLocaleString("id-ID") }) }),
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: lakiLaki.toLocaleString("id-ID") }) }),
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: perempuan.toLocaleString("id-ID") }) }),
										/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: sexRatio }) })
									] }) })
								]
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/pemerintahan/StatistikDusun.jsx
function CustomTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "chart-tooltip",
		children: [label && /* @__PURE__ */ jsx("p", {
			className: "chart-tooltip__label",
			children: label
		}), payload.map((p, i) => /* @__PURE__ */ jsxs("p", {
			style: { color: p.fill || p.color },
			children: [
				p.name,
				": ",
				/* @__PURE__ */ jsx("strong", { children: p.value.toLocaleString("id-ID") })
			]
		}, i))]
	});
}
function MiniCard({ icon, value, label, accent }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `mini-card ${accent ? "mini-card--accent" : ""}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: "mini-card__icon",
			"aria-hidden": "true",
			children: icon
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "mini-card__value",
			children: typeof value === "number" ? value.toLocaleString("id-ID") : value
		}), /* @__PURE__ */ jsx("p", {
			className: "mini-card__label",
			children: label
		})] })]
	});
}
function DusunSelector({ dusunList, selected, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "dusun-selector",
		role: "navigation",
		"aria-label": "Pilih Dusun",
		children: [/* @__PURE__ */ jsx("p", {
			className: "dusun-selector__label",
			children: "Pilih Dusun:"
		}), /* @__PURE__ */ jsx("div", {
			className: "dusun-selector__chips",
			children: dusunList.map((d) => /* @__PURE__ */ jsx("button", {
				id: `dusun-btn-${d.slug}`,
				className: `dusun-chip ${selected === d.slug ? "dusun-chip--active" : ""}`,
				onClick: () => onChange(d.slug),
				"aria-pressed": selected === d.slug,
				children: d.nama
			}, d.slug))
		})]
	});
}
function StatistikDusun() {
	const [selectedSlug, setSelectedSlug] = useState(statistikPerDusun[0].slug);
	const dusun = statistikPerDusun.find((d) => d.slug === selectedSlug) ?? statistikPerDusun[0];
	const dataPerbandingan = statistikPerDusun.map((d) => ({
		nama: d.nama.replace("Dusun ", ""),
		"Laki-Laki": d.laki,
		"Perempuan": d.perempuan,
		isSelected: d.slug === selectedSlug
	}));
	return /* @__PURE__ */ jsxs("div", {
		className: "statistik-dusun",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Statistik Kependudukan Dusun",
				description: "Data statistik kependudukan per dusun di Desa Karangtalun — perbandingan jumlah jiwa, KK, dan komposisi penduduk 12 dusun."
			}),
			/* @__PURE__ */ jsx(Header, {
				title: "Statistik Per Dusun",
				subtitle: "Perbandingan data kependudukan 12 dusun · Desa Karangtalun",
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container statistik-dusun__content",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "data-notice",
						role: "note",
						children: [/* @__PURE__ */ jsx("span", {
							className: "data-notice__icon",
							children: "⚠️"
						}), /* @__PURE__ */ jsxs("p", { children: [
							"Data bersifat ",
							/* @__PURE__ */ jsx("strong", { children: "sementara" }),
							" dan akan diperbarui setelah verifikasi dengan administrasi desa dan BPS Kabupaten Magelang."
						] })]
					}),
					/* @__PURE__ */ jsx(DusunSelector, {
						dusunList: statistikPerDusun,
						selected: selectedSlug,
						onChange: setSelectedSlug
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "dusun-detail",
						"aria-live": "polite",
						"aria-label": `Detail ${dusun.nama}`,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "dusun-detail__header",
								children: [/* @__PURE__ */ jsx("span", {
									className: "dusun-detail__badge",
									children: "Data Dusun"
								}), /* @__PURE__ */ jsxs("h2", {
									className: "dusun-detail__name",
									children: ["Dusun ", dusun.nama]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mini-cards-grid",
								children: [
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "👥",
										value: dusun.jiwa,
										label: "Total Jiwa",
										accent: true
									}),
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "🏠",
										value: dusun.kk,
										label: "Kepala Keluarga"
									}),
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "👨",
										value: dusun.laki,
										label: "Laki-Laki"
									}),
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "👩",
										value: dusun.perempuan,
										label: "Perempuan"
									}),
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "💪",
										value: dusun.umurProduktif,
										label: "Usia Produktif (15–59)"
									}),
									/* @__PURE__ */ jsx(MiniCard, {
										icon: "👴",
										value: dusun.lansia,
										label: "Lansia (60+)"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "dusun-chart-wrapper",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "dusun-chart__title",
									children: "Komposisi Jenis Kelamin"
								}), /* @__PURE__ */ jsx("div", {
									className: "dusun-pie-container",
									children: /* @__PURE__ */ jsx(ResponsiveContainer, {
										width: "100%",
										height: 220,
										children: /* @__PURE__ */ jsxs(PieChart, { children: [
											/* @__PURE__ */ jsx(Pie, {
												data: dusun.jenisKelamin,
												dataKey: "value",
												nameKey: "name",
												cx: "50%",
												cy: "50%",
												innerRadius: 55,
												outerRadius: 90,
												paddingAngle: 4,
												label: ({ name, percent }) => `${(percent * 100).toFixed(1)}%`,
												labelLine: false,
												children: dusun.jenisKelamin.map((entry, i) => /* @__PURE__ */ jsx(Cell, { fill: entry.fill }, i))
											}),
											/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
											/* @__PURE__ */ jsx(Legend, {})
										] })
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						"aria-labelledby": "perbandingan-title",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "section-heading",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "section-heading__title",
								children: "Perbandingan Semua Dusun"
							}), /* @__PURE__ */ jsx("p", {
								className: "section-heading__sub",
								children: "Jumlah jiwa laki-laki dan perempuan per dusun"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "chart-card",
							children: /* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: 320,
								children: /* @__PURE__ */ jsxs(BarChart, {
									data: dataPerbandingan,
									margin: {
										top: 8,
										right: 8,
										left: -8,
										bottom: 40
									},
									children: [
										/* @__PURE__ */ jsx(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)"
										}),
										/* @__PURE__ */ jsx(XAxis, {
											dataKey: "nama",
											tick: { fontSize: 10 },
											angle: -35,
											textAnchor: "end",
											interval: 0
										}),
										/* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11 } }),
										/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
										/* @__PURE__ */ jsx(Legend, { wrapperStyle: { paddingTop: "8px" } }),
										/* @__PURE__ */ jsx(Bar, {
											dataKey: "Laki-Laki",
											fill: "#96D539",
											radius: [
												3,
												3,
												0,
												0
											]
										}),
										/* @__PURE__ */ jsx(Bar, {
											dataKey: "Perempuan",
											fill: "#1B4332",
											radius: [
												3,
												3,
												0,
												0
											]
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						"aria-labelledby": "tabel-rank-title",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "section-heading",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "section-heading__title",
									children: "Peringkat Dusun"
								}), /* @__PURE__ */ jsx("p", {
									className: "section-heading__sub",
									children: "Urutan berdasarkan jumlah penduduk (terbanyak)"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "tabel-wrapper",
								children: /* @__PURE__ */ jsxs("table", {
									className: "tabel-dusun",
									"aria-label": "Peringkat penduduk per dusun",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", { children: "#" }),
										/* @__PURE__ */ jsx("th", { children: "Dusun" }),
										/* @__PURE__ */ jsx("th", { children: "Jiwa" }),
										/* @__PURE__ */ jsx("th", { children: "KK" }),
										/* @__PURE__ */ jsx("th", { children: "Rata-rata / KK" })
									] }) }), /* @__PURE__ */ jsx("tbody", { children: [...statistikPerDusun].sort((a, b) => b.jiwa - a.jiwa).map((d, i) => /* @__PURE__ */ jsxs("tr", {
										className: d.slug === selectedSlug ? "tabel-row--active" : "",
										onClick: () => setSelectedSlug(d.slug),
										style: { cursor: "pointer" },
										title: `Lihat detail ${d.nama}`,
										children: [
											/* @__PURE__ */ jsx("td", { children: i + 1 }),
											/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: d.nama }) }),
											/* @__PURE__ */ jsx("td", { children: d.jiwa.toLocaleString("id-ID") }),
											/* @__PURE__ */ jsx("td", { children: d.kk.toLocaleString("id-ID") }),
											/* @__PURE__ */ jsx("td", { children: (d.jiwa / d.kk).toFixed(1) })
										]
									}, d.slug)) })]
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "tabel-note",
								children: "💡 Klik baris untuk melihat detail dusun."
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/map/MarkerPopup.jsx
/**
* Konten popup untuk marker titik (UMKM, Wisata, Fasilitas Umum).
* Dirender sebagai children dari <Popup> milik react-leaflet, sehingga
* bisa memakai komponen React biasa (bukan HTML string).
*/
function MarkerPopup({ data, categoryLabel }) {
	const { nama, deskripsi, gambar, alamat, kontak } = data;
	return /* @__PURE__ */ jsxs("div", {
		className: "marker-popup",
		children: [gambar && /* @__PURE__ */ jsx("img", {
			src: gambar,
			alt: nama,
			className: "marker-popup__image",
			loading: "lazy",
			onError: (e) => {
				e.currentTarget.style.display = "none";
			}
		}), /* @__PURE__ */ jsxs("div", {
			className: "marker-popup__body",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "marker-popup__category",
					children: categoryLabel
				}),
				/* @__PURE__ */ jsx("h4", {
					className: "marker-popup__title",
					children: nama
				}),
				deskripsi && /* @__PURE__ */ jsx("p", {
					className: "marker-popup__desc",
					children: deskripsi
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "marker-popup__meta-list",
					children: [alamat && /* @__PURE__ */ jsxs("span", {
						className: "marker-popup__meta",
						children: [/* @__PURE__ */ jsx(MapPin, {
							size: 13,
							strokeWidth: 2.2
						}), alamat]
					}), kontak && kontak !== "-" && /* @__PURE__ */ jsxs("span", {
						className: "marker-popup__meta",
						children: [/* @__PURE__ */ jsx(Phone, {
							size: 13,
							strokeWidth: 2.2
						}), kontak]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/utils/mapIcons.jsx
/**
* Konfigurasi visual tiap kategori marker.
* Tambahkan kategori baru di sini apabila diperlukan.
*/
var CATEGORY_CONFIG = {
	umkm: {
		Icon: Store,
		color: "#d97706"
	},
	wisata: {
		Icon: Camera,
		color: "#0284c7"
	},
	fasilitas: {
		Icon: Building2,
		color: "#7c3aed"
	}
};
/**
* Membuat L.divIcon berbentuk pin bulat dengan ikon lucide-react di dalamnya.
* Menggunakan divIcon (bukan L.icon gambar) agar ringan dan mudah diberi style CSS.
*
* @param {"umkm" | "wisata" | "fasilitas"} category
* @returns {L.DivIcon}
*/
function createCategoryIcon(category) {
	const { Icon, color } = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.fasilitas;
	const html = `
    <span class="map-pin" style="--pin-color:${color}">
      <span class="map-pin__icon">${renderToStaticMarkup(/* @__PURE__ */ jsx(Icon, {
		size: 15,
		color: "#ffffff",
		strokeWidth: 2.5
	}))}</span>
    </span>
  `;
	return L.divIcon({
		html,
		className: "map-pin-wrapper",
		iconSize: [30, 38],
		iconAnchor: [15, 36],
		popupAnchor: [0, -34]
	});
}
/** Label tampilan untuk tiap kategori, dipakai di popup & legend. */
var CATEGORY_LABELS = {
	umkm: "UMKM",
	wisata: "Wisata",
	fasilitas: "Fasilitas Umum"
};
/** Warna tiap kategori, dipakai di legend supaya konsisten dengan marker. */
var CATEGORY_COLORS = {
	umkm: CATEGORY_CONFIG.umkm.color,
	wisata: CATEGORY_CONFIG.wisata.color,
	fasilitas: CATEGORY_CONFIG.fasilitas.color
};
//#endregion
//#region src/data/static/umkm.json
var umkm_default = [
	{
		"id": "ChIJf1pczDT1ei4ROcEVvgbJH2I",
		"nama": "Warung Mbah Mun",
		"kategori": "UMKM Warung",
		"deskripsi": "Usaha warung lokal yang berlokasi di Dusun Dangkel, melayani kebutuhan harian dan makanan bagi warga sekitar dengan rating yang sangat baik.",
		"gambar": "/images/umkm/warung-mbah-mun.jpg",
		"alamat": "Dangkel, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.669,
		"lng": 110.27
	},
	{
		"id": "ChIJz3VX26H1ei4RGfujujrcAMc",
		"nama": "Warung Mbak Sri",
		"kategori": "UMKM Warung",
		"deskripsi": "Warung yang buka sejak pagi hingga malam hari, menyediakan aneka kebutuhan pokok dan jajanan di area Dangkel.",
		"gambar": "/images/umkm/warung-mbak-sri.jpg",
		"alamat": "Dangkel, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.6685,
		"lng": 110.271
	},
	{
		"id": "ChIJ21Sc8eP0ei4RKvRtzeOg_tA",
		"nama": "Kupat Tahu Kajoran",
		"kategori": "UMKM Kuliner",
		"deskripsi": "Warung makan khas Kupat Tahu yang berlokasi di wilayah Kajoran Karangtalun. Cocok untuk bersantap pada siang hingga malam hari.",
		"gambar": "/images/umkm/kupat-tahu-kajoran.jpg",
		"alamat": "Kajoran, Karangtalun 2, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.671,
		"lng": 110.274
	},
	{
		"id": "ChIJjVgzijD1ei4RbA4R-Wop5AQ",
		"nama": "Toko kelontong Mas Petruk",
		"kategori": "UMKM Toko Kelontong",
		"deskripsi": "Toko yang menyediakan barang-barang kelontong dan kebutuhan sehari-hari bagi warga di dusun Jambon, Karangtalun. Buka setiap hari.",
		"gambar": "/images/umkm/toko-mas-petruk.jpg",
		"alamat": "Jambon, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "0857-2696-8013",
		"lat": -7.667,
		"lng": 110.275
	},
	{
		"id": "ChIJdXVSUOX0ei4RAa0x73ZsbME",
		"nama": "SRC FAMILY KARANGTALUN",
		"kategori": "UMKM Toko Kelontong",
		"deskripsi": "Toko kelontong modern yang tergabung dalam jaringan SRC, berlokasi di RT 1 RW 6 Karangtalun, menyediakan berbagai kebutuhan rumah tangga.",
		"gambar": "/images/umkm/src-family.jpg",
		"alamat": "RT.01/RW.06, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "0821-3811-1579",
		"lat": -7.665,
		"lng": 110.272
	},
	{
		"id": "ChIJreeIlOb1ei4R6w-XNUN6aKs",
		"nama": "Toko Mbak Ratna",
		"kategori": "UMKM Toko Kelontong",
		"deskripsi": "Toko kelontong rumahan yang melayani masyarakat di sekitar Karangtalun. Beroperasi dari pagi hingga malam hari.",
		"gambar": "/images/umkm/toko-mbak-ratna.jpg",
		"alamat": "Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.666,
		"lng": 110.2715
	}
];
//#endregion
//#region src/data/static/wisata.json
var wisata_default = [
	{
		"id": "ChIJrRM7ALT1ei4RetI6tW4ZSsM",
		"nama": "Ancol Wisata Alam",
		"kategori": "Wisata Alam",
		"deskripsi": "Kawasan rekreasi alam yang menyajikan panorama aliran sungai dan pepohonan rindang. Tempat ini cocok digunakan untuk bersantai bersama keluarga sambil menikmati suasana sejuk alam pedesaan.",
		"gambar": "/images/wisata/ancol-wisata-alam.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.66985,
		"lng": 110.27215
	},
	{
		"id": "ChIJU1jTcP31ei4R-rZulrVYDak",
		"nama": "Bendung Karangtalun",
		"kategori": "Wisata Alam",
		"deskripsi": "Area bendungan sungai bersejarah yang sering dikunjungi masyarakat sebagai spot wisata lokal. Pengunjung dapat bersantai menikmati pemandangan aliran air yang luas dengan latar asri.",
		"gambar": "/images/wisata/bendung-karangtalun.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.66955,
		"lng": 110.27255
	},
	{
		"id": "ChIJJUOmR-70ei4Riy94kACMLes",
		"nama": "Bendung Ancol",
		"kategori": "Wisata Alam",
		"deskripsi": "Infrastruktur saluran pengairan (terhubung dengan Saluran Mataram) yang sekaligus menjadi tempat rekreasi terbuka. Pengunjung dapat menikmati udara segar di sekitar area bendungan secara gratis.",
		"gambar": "/images/wisata/bendung-ancol.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"kontak": "-",
		"lat": -7.66925,
		"lng": 110.27245
	}
];
//#endregion
//#region src/data/static/fasilitas.json
var fasilitas_default = [
	{
		"id": "fasilitas-1",
		"nama": "Masjid Al-Ikhsan",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang menjadi pusat kegiatan ibadah dan aktivitas keagamaan masyarakat Dusun Dangkel.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Dangkel, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.647254057496377,
		"lng": 110.26621323799743
	},
	{
		"id": "fasilitas-2",
		"nama": "Masjid Al Muttaqin Dangkel",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang melayani kebutuhan ibadah harian serta kegiatan keagamaan masyarakat sekitar.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Dangkel, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.64742267424303,
		"lng": 110.26875237106083
	},
	{
		"id": "fasilitas-3",
		"nama": "Masjid Baitus Salam",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang menjadi tempat pelaksanaan salat berjamaah dan kegiatan sosial keagamaan warga Jampiroso.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jampiroso, Gesikan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.651134700192332,
		"lng": 110.27116009892082
	},
	{
		"id": "fasilitas-4",
		"nama": "Musholla Jampiroso",
		"kategori": "Ibadah",
		"deskripsi": "Musholla yang digunakan masyarakat sekitar untuk ibadah harian dan kegiatan keagamaan.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Gesikan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.651296404217296,
		"lng": 110.27273330255619
	},
	{
		"id": "fasilitas-5",
		"nama": "Mushola An Nur",
		"kategori": "Ibadah",
		"deskripsi": "Musholla yang menjadi sarana ibadah dan pembinaan keagamaan masyarakat setempat.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Gesikan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.648980122190786,
		"lng": 110.27474802970188
	},
	{
		"id": "fasilitas-6",
		"nama": "Masjid Al Mukarrom",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang menjadi pusat kegiatan keagamaan masyarakat Dusun Jangkang.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jangkang, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.6551302228102465,
		"lng": 110.26676971020142
	},
	{
		"id": "fasilitas-7",
		"nama": "Masjid Al Muttaqin",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang digunakan masyarakat sekitar sebagai tempat ibadah dan kegiatan kemasyarakatan.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karang Luar, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.657286730548056,
		"lng": 110.26717265563056
	},
	{
		"id": "fasilitas-8",
		"nama": "Masjid Jami' Al-Hidayah",
		"kategori": "Ibadah",
		"deskripsi": "Masjid jami' yang menjadi tempat penyelenggaraan ibadah berjamaah dan kegiatan keagamaan warga.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.656807507522753,
		"lng": 110.27829394945053
	},
	{
		"id": "fasilitas-9",
		"nama": "Mushola Al Hidayah",
		"kategori": "Ibadah",
		"deskripsi": "Musholla yang melayani kebutuhan ibadah masyarakat Dusun Selingan.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.660561406613508,
		"lng": 110.26797854652902
	},
	{
		"id": "fasilitas-10",
		"nama": "Masjid Al Falah",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang menjadi pusat kegiatan ibadah masyarakat Dusun Jambon.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jambon, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.660002317359438,
		"lng": 110.26926797190228
	},
	{
		"id": "fasilitas-11",
		"nama": "Musholla Al-Barokah",
		"kategori": "Ibadah",
		"deskripsi": "Musholla yang digunakan untuk pelaksanaan ibadah harian dan kegiatan keagamaan masyarakat.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karang Talun 2, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.662797756319082,
		"lng": 110.27063798630611
	},
	{
		"id": "fasilitas-12",
		"nama": "Masjid Darul Falah",
		"kategori": "Ibadah",
		"deskripsi": "Masjid yang menjadi pusat aktivitas ibadah dan pembinaan keagamaan masyarakat Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karang Talun, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.663995795958582,
		"lng": 110.27233035710847
	},
	{
		"id": "fasilitas-13",
		"nama": "Musholla Tarbiyatul Fataa",
		"kategori": "Ibadah",
		"deskripsi": "Musholla yang digunakan sebagai tempat ibadah sekaligus pembelajaran keagamaan masyarakat.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karang Talun, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.664395141756005,
		"lng": 110.27112152082108
	},
	{
		"id": "fasilitas-14",
		"nama": "Masjid Jami'ul Muhtadin",
		"kategori": "Ibadah",
		"deskripsi": "Masjid jami' yang menjadi pusat pelaksanaan salat Jumat dan kegiatan keagamaan masyarakat Selingan.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.667430157574141,
		"lng": 110.27015445179114
	},
	{
		"id": "fasilitas-15",
		"nama": "SD Negeri Karangtalun 1",
		"kategori": "Pendidikan",
		"deskripsi": "Sekolah dasar negeri yang melayani pendidikan dasar bagi anak-anak di wilayah Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jampiroso, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.6504619637784215,
		"lng": 110.27430117075772
	},
	{
		"id": "fasilitas-16",
		"nama": "RA Muslimat NU Karangtalun 2",
		"kategori": "Pendidikan",
		"deskripsi": "Lembaga pendidikan anak usia dini berbasis pendidikan Islam di Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Baran, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.659138676908314,
		"lng": 110.27867853587004
	},
	{
		"id": "fasilitas-17",
		"nama": "PAUDQu Al Barokah",
		"kategori": "Pendidikan",
		"deskripsi": "Lembaga pendidikan usia dini yang berfokus pada pembelajaran dasar dan pendidikan Al-Qur'an.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jl. Joho, Karang Talun 2, Karangtalun, Kec. Ngluwar, Kabupaten Magelang",
		"lat": -7.6646001079355095,
		"lng": 110.2709029964955
	},
	{
		"id": "fasilitas-18",
		"nama": "TK ABA Karangtalun 2",
		"kategori": "Pendidikan",
		"deskripsi": "Taman Kanak-Kanak yang menyediakan pendidikan anak usia dini di wilayah Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Selingan, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.6651598778718935,
		"lng": 110.2723305272167
	},
	{
		"id": "fasilitas-19",
		"nama": "SD Negeri Karangtalun 2",
		"kategori": "Pendidikan",
		"deskripsi": "Sekolah dasar negeri yang memberikan layanan pendidikan dasar bagi masyarakat Desa Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Karang Talun, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.665275965571898,
		"lng": 110.27213530332524
	},
	{
		"id": "fasilitas-20",
		"nama": "Kantor Kepala Desa Karangtalun",
		"kategori": "Pemerintahan",
		"deskripsi": "Kantor pemerintahan desa yang menjadi pusat pelayanan administrasi dan kegiatan pemerintahan Desa Karangtalun.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jangkang, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.656747494369523,
		"lng": 110.26689375099511
	},
	{
		"id": "fasilitas-21",
		"nama": "Balai Desa Karangtalun",
		"kategori": "Pemerintahan",
		"deskripsi": "Balai desa yang digunakan sebagai pusat kegiatan pemerintahan, musyawarah, dan pelayanan masyarakat.",
		"gambar": "/images/fasilitas/default.jpg",
		"alamat": "Jangkang, Karangtalun, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485",
		"lat": -7.656763013281493,
		"lng": 110.26676065355207
	}
];
//#endregion
//#region src/components/map/InteractiveMap.jsx
var DESA_GEOJSON_URL = "/maps/karangtalun.geojson";
var DEFAULT_CENTER = [-7.657, 110.271];
var DEFAULT_ZOOM = 15;
var desaBaseStyle = {
	color: "#1e7145",
	weight: 2.5,
	opacity: 1,
	fillColor: "#2e7d32",
	fillOpacity: .15
};
/** Lookup cepat data dusun berdasarkan id, dipakai saat membangun popup. */
/**
* Komponen inti peta. Mengelola basemap, layer batas wilayah, dan marker.
* `mapRef` diteruskan langsung ke MapContainer sehingga parent (PetaInteraktif)
* bisa mengontrol peta (flyTo, fitBounds) tanpa state tambahan.
*
* @param {{ mapRef: React.RefObject<L.Map>, layers: Record<string, boolean>, onBoundsReady: (bounds: L.LatLngBounds) => void }} props
*/
function InteractiveMap({ mapRef, layers, onBoundsReady }) {
	const [desaGeoJson, setDesaGeoJson] = useState(null);
	useEffect(() => {
		console.log("USE EFFECT JALAN");
		let isMounted = true;
		fetch(DESA_GEOJSON_URL).then((res) => {
			console.log("STATUS:", res.status);
			console.log("URL:", res.url);
			return res.json();
		}).then((data) => {
			console.log("DATA:", data);
			if (!isMounted) return;
			setDesaGeoJson(data);
		}).catch((err) => {
			console.error("ERROR:", err);
		});
		return () => {
			isMounted = false;
		};
	}, []);
	const handleEachDesaFeature = (feature, layer) => {
		const p = feature.properties;
		layer.bindPopup(`
      <div style="min-width:220px">
        <h3 style="margin:0 0 8px;font-size:16px;">
          ${p.NAMOBJ}
        </h3>

        <table style="font-size:13px">
          <tr>
            <td><b>Kecamatan</b></td>
            <td>${p.WADMKC}</td>
          </tr>
          <tr>
            <td><b>Kabupaten</b></td>
            <td>${p.WADMKK}</td>
          </tr>
          <tr>
            <td><b>Provinsi</b></td>
            <td>${p.WADMPR}</td>
          </tr>
          <tr>
            <td><b>Kode Desa</b></td>
            <td>${p.KDEPUM}</td>
          </tr>
        </table>
      </div>
    `);
		layer.on({
			mouseover: (e) => e.target.setStyle({ fillOpacity: .25 }),
			mouseout: (e) => e.target.setStyle(desaBaseStyle)
		});
	};
	return /* @__PURE__ */ jsxs(MapContainer, {
		ref: mapRef,
		center: DEFAULT_CENTER,
		zoom: DEFAULT_ZOOM,
		zoomControl: false,
		className: "interactive-map",
		children: [
			/* @__PURE__ */ jsx(TileLayer, {
				url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
			}),
			/* @__PURE__ */ jsx(ZoomControl, { position: "bottomright" }),
			layers.batasDesa && desaGeoJson && /* @__PURE__ */ jsx(GeoJSON, {
				data: desaGeoJson,
				style: desaBaseStyle,
				onEachFeature: handleEachDesaFeature
			}),
			layers.umkm && umkm_default.map((item) => /* @__PURE__ */ jsx(Marker, {
				position: [item.lat, item.lng],
				icon: createCategoryIcon("umkm"),
				children: /* @__PURE__ */ jsx(Popup, { children: /* @__PURE__ */ jsx(MarkerPopup, {
					data: item,
					categoryLabel: CATEGORY_LABELS.umkm
				}) })
			}, item.id)),
			layers.wisata && wisata_default.map((item) => /* @__PURE__ */ jsx(Marker, {
				position: [item.lat, item.lng],
				icon: createCategoryIcon("wisata"),
				children: /* @__PURE__ */ jsx(Popup, { children: /* @__PURE__ */ jsx(MarkerPopup, {
					data: item,
					categoryLabel: CATEGORY_LABELS.wisata
				}) })
			}, item.id)),
			layers.fasilitas && fasilitas_default.map((item) => /* @__PURE__ */ jsx(Marker, {
				position: [item.lat, item.lng],
				icon: createCategoryIcon("fasilitas"),
				children: /* @__PURE__ */ jsx(Popup, { children: /* @__PURE__ */ jsx(MarkerPopup, {
					data: item,
					categoryLabel: CATEGORY_LABELS.fasilitas
				}) })
			}, item.id))
		]
	});
}
//#endregion
//#region src/components/map/LayerControl.jsx
var LAYER_OPTIONS = [
	{
		key: "batasDesa",
		label: "Batas Desa",
		Icon: Shapes
	},
	{
		key: "umkm",
		label: "UMKM",
		Icon: Store
	},
	{
		key: "wisata",
		label: "Wisata",
		Icon: Camera
	},
	{
		key: "fasilitas",
		label: "Fasilitas Umum",
		Icon: Building2
	}
];
/**
* Panel untuk mengaktifkan/menonaktifkan layer pada peta.
* @param {{ layers: Record<string, boolean>, onToggle: (key: string) => void }} props
*/
function LayerControl({ layers, onToggle }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "layer-control",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "layer-control__header",
			children: [/* @__PURE__ */ jsx(Layers, {
				size: 16,
				strokeWidth: 2.2
			}), /* @__PURE__ */ jsx("span", { children: "Layer Peta" })]
		}), /* @__PURE__ */ jsx("ul", {
			className: "layer-control__list",
			children: LAYER_OPTIONS.map(({ key, label, Icon }) => /* @__PURE__ */ jsx("li", {
				className: "layer-control__item",
				children: /* @__PURE__ */ jsxs("label", {
					className: "layer-control__label",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: layers[key],
							onChange: () => onToggle(key)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "layer-control__checkbox",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx(Icon, {
							size: 15,
							strokeWidth: 2.2
						}),
						/* @__PURE__ */ jsx("span", { children: label })
					]
				})
			}, key))
		})]
	});
}
//#endregion
//#region src/components/map/MapLegend.jsx
var LEGEND_ITEMS = [
	{
		type: "polygon",
		label: "Batas Desa",
		color: "#1e7145"
	},
	{
		type: "point",
		label: CATEGORY_LABELS.umkm,
		color: CATEGORY_COLORS.umkm
	},
	{
		type: "point",
		label: CATEGORY_LABELS.wisata,
		color: CATEGORY_COLORS.wisata
	},
	{
		type: "point",
		label: CATEGORY_LABELS.fasilitas,
		color: CATEGORY_COLORS.fasilitas
	}
];
/** Legenda peta — bisa dilipat (collapse) untuk layar kecil. */
function MapLegend() {
	const [isOpen, setIsOpen] = useState(true);
	return /* @__PURE__ */ jsxs("div", {
		className: "map-legend",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "map-legend__header",
			onClick: () => setIsOpen((prev) => !prev),
			"aria-expanded": isOpen,
			children: [/* @__PURE__ */ jsx("span", { children: "Legenda" }), isOpen ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronUp, { size: 16 })]
		}), isOpen && /* @__PURE__ */ jsx("ul", {
			className: "map-legend__list",
			children: LEGEND_ITEMS.map((item) => /* @__PURE__ */ jsxs("li", {
				className: "map-legend__item",
				children: [/* @__PURE__ */ jsx("span", {
					className: item.type === "polygon" ? "map-legend__swatch map-legend__swatch--polygon" : "map-legend__swatch map-legend__swatch--point",
					style: { "--swatch-color": item.color }
				}), /* @__PURE__ */ jsx("span", { children: item.label })]
			}, item.label))
		})]
	});
}
//#endregion
//#region src/components/map/SearchBox.jsx
/**
* Kotak pencarian lokasi titik (UMKM/Wisata/Fasilitas) di atas peta.
* @param {{ items: Array<{id: string, nama: string, category: string, lat: number, lng: number}>, onSelectLocation: (lat: number, lng: number) => void }} props
*/
function SearchBox({ items, onSelectLocation }) {
	const [query, setQuery] = useState("");
	const results = useMemo(() => {
		const keyword = query.trim().toLowerCase();
		if (!keyword) return [];
		return items.filter((item) => item.nama.toLowerCase().includes(keyword)).slice(0, 6);
	}, [items, query]);
	const handleSelect = (item) => {
		onSelectLocation(item.lat, item.lng);
		setQuery(item.nama);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "search-box",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "search-box__input-wrapper",
			children: [
				/* @__PURE__ */ jsx(Search, {
					size: 16,
					strokeWidth: 2.2
				}),
				/* @__PURE__ */ jsx("input", {
					type: "text",
					value: query,
					placeholder: "Cari UMKM, wisata, atau fasilitas...",
					onChange: (e) => setQuery(e.target.value)
				}),
				query && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "search-box__clear",
					onClick: () => setQuery(""),
					"aria-label": "Hapus pencarian",
					children: /* @__PURE__ */ jsx(X, { size: 14 })
				})
			]
		}), results.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "search-box__results",
			children: results.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => handleSelect(item),
				children: [/* @__PURE__ */ jsx("span", {
					className: "search-box__result-name",
					children: item.nama
				}), /* @__PURE__ */ jsx("span", {
					className: "search-box__result-category",
					children: CATEGORY_LABELS[item.category]
				})]
			}) }, item.id))
		})]
	});
}
//#endregion
//#region src/components/map/FloatingButtons.jsx
/**
* Tombol aksi mengambang di atas peta: reset tampilan & fullscreen.
* Zoom control ditangani terpisah oleh Leaflet ZoomControl bawaan.
* @param {{ isFullscreen: boolean, onToggleFullscreen: () => void, onReset: () => void }} props
*/
function FloatingButtons({ isFullscreen, onToggleFullscreen, onReset }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "floating-buttons",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "floating-buttons__btn",
			onClick: onReset,
			title: "Reset tampilan peta",
			"aria-label": "Reset tampilan peta",
			children: /* @__PURE__ */ jsx(RotateCcw, {
				size: 17,
				strokeWidth: 2.2
			})
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "floating-buttons__btn",
			onClick: onToggleFullscreen,
			title: isFullscreen ? "Keluar dari layar penuh" : "Layar penuh",
			"aria-label": isFullscreen ? "Keluar dari layar penuh" : "Layar penuh",
			children: isFullscreen ? /* @__PURE__ */ jsx(Minimize2, {
				size: 17,
				strokeWidth: 2.2
			}) : /* @__PURE__ */ jsx(Maximize2, {
				size: 17,
				strokeWidth: 2.2
			})
		})]
	});
}
//#endregion
//#region src/hooks/useMapLayers.js
/** Konfigurasi layer default — semua layer aktif saat halaman pertama dibuka. */
var DEFAULT_LAYERS = {
	batasDesa: true,
	batasDusun: true,
	umkm: true,
	wisata: true,
	fasilitas: true
};
/**
* Mengelola visibilitas setiap layer pada peta interaktif.
* @returns {{ layers: typeof DEFAULT_LAYERS, toggleLayer: (key: keyof typeof DEFAULT_LAYERS) => void }}
*/
function useMapLayers() {
	const [layers, setLayers] = useState(DEFAULT_LAYERS);
	return {
		layers,
		toggleLayer: useCallback((key) => {
			setLayers((prev) => ({
				...prev,
				[key]: !prev[key]
			}));
		}, [])
	};
}
//#endregion
//#region src/hooks/useFullscreen.js
/**
* Mengaktifkan/menonaktifkan mode fullscreen pada elemen yang direferensikan.
* @param {React.RefObject<HTMLElement>} targetRef
*/
function useFullscreen(targetRef) {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const toggleFullscreen = useCallback(() => {
		const el = targetRef.current;
		if (!el) return;
		if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
		else document.exitFullscreen?.();
	}, [targetRef]);
	useEffect(() => {
		const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", handleChange);
		return () => document.removeEventListener("fullscreenchange", handleChange);
	}, []);
	return {
		isFullscreen,
		toggleFullscreen
	};
}
//#endregion
//#region src/utils/searchIndex.js
/**
* Menggabungkan beberapa dataset titik menjadi satu daftar datar
* yang siap dipakai oleh SearchBox, masing-masing item diberi tag kategori.
*
* @param {{ umkm: Array<object>, wisata: Array<object>, fasilitas: Array<object> }} datasets
*/
function buildSearchIndex({ umkm, wisata, fasilitas }) {
	const tag = (items, category) => items.map((item) => ({
		...item,
		category
	}));
	return [
		...tag(umkm, "umkm"),
		...tag(wisata, "wisata"),
		...tag(fasilitas, "fasilitas")
	];
}
//#endregion
//#region src/pages/peta-lokasi/PetaInteraktif.jsx
var searchIndex = buildSearchIndex({
	umkm: umkm_default,
	wisata: wisata_default,
	fasilitas: fasilitas_default
});
var FLY_TO_ZOOM = 17;
function PetaInteraktif() {
	const mapRef = useRef(null);
	const shellRef = useRef(null);
	const initialBoundsRef = useRef(null);
	const { layers, toggleLayer } = useMapLayers();
	const { isFullscreen, toggleFullscreen } = useFullscreen(shellRef);
	const [isLegendCollapsedHint] = useState(false);
	const handleBoundsReady = useCallback((bounds) => {
		initialBoundsRef.current = bounds;
	}, []);
	const handleReset = useCallback(() => {
		if (mapRef.current && initialBoundsRef.current) mapRef.current.fitBounds(initialBoundsRef.current, { padding: [32, 32] });
	}, []);
	const handleSelectLocation = useCallback((lat, lng) => {
		mapRef.current?.flyTo([lat, lng], FLY_TO_ZOOM, { duration: 1.1 });
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "peta-page",
		children: [/* @__PURE__ */ jsx("header", {
			className: "peta-page__header",
			children: /* @__PURE__ */ jsxs("div", {
				className: "peta-page__heading",
				children: [/* @__PURE__ */ jsx(MapPin, {
					size: 22,
					strokeWidth: 2.2
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", { children: "Peta Interaktif" }), /* @__PURE__ */ jsx("p", { children: "Sebaran wilayah, UMKM, wisata, dan fasilitas umum Desa Karangtalun" })] })]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "map-shell",
			ref: shellRef,
			"data-fullscreen": isLegendCollapsedHint,
			children: [
				/* @__PURE__ */ jsx(InteractiveMap, {
					mapRef,
					layers,
					onBoundsReady: handleBoundsReady
				}),
				/* @__PURE__ */ jsx("div", {
					className: "map-shell__overlay map-shell__overlay--top-left",
					children: /* @__PURE__ */ jsx(SearchBox, {
						items: searchIndex,
						onSelectLocation: handleSelectLocation
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "map-shell__overlay map-shell__overlay--top-right",
					children: /* @__PURE__ */ jsx(LayerControl, {
						layers,
						onToggle: toggleLayer
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "map-shell__overlay map-shell__overlay--bottom-left",
					children: /* @__PURE__ */ jsx(MapLegend, {})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "map-shell__overlay map-shell__overlay--bottom-right",
					children: /* @__PURE__ */ jsx(FloatingButtons, {
						isFullscreen,
						onToggleFullscreen: toggleFullscreen,
						onReset: handleReset
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/galeri/Overview.jsx
var DUSUN_LIST = [
	{
		slug: "semua",
		nama: "Semua Dusun"
	},
	{
		slug: "baran",
		nama: "Baran"
	},
	{
		slug: "dangkel-kulon",
		nama: "Dangkel Kulon"
	},
	{
		slug: "dangkel-wetan",
		nama: "Dangkel Wetan"
	},
	{
		slug: "jambon",
		nama: "Jambon"
	},
	{
		slug: "jampiroso",
		nama: "Jampiroso"
	},
	{
		slug: "jangkang",
		nama: "Jangkang"
	},
	{
		slug: "jangkang-a",
		nama: "Jangkang A"
	},
	{
		slug: "jangkang-b",
		nama: "Jangkang B"
	},
	{
		slug: "joho",
		nama: "Joho"
	},
	{
		slug: "kajoran",
		nama: "Kajoran"
	},
	{
		slug: "karangtalun",
		nama: "Karangtalun"
	},
	{
		slug: "selingan",
		nama: "Selingan"
	}
];
var GALERI_DATA = [
	{
		id: 1,
		title: "Kerja Bakti Bersih Desa & Gotong Royong",
		desc: "Warga bersama-sama membersihkan saluran irigasi dan jalan lingkungan menjelang musim tanam padi.",
		category: "kegiatan",
		dusun: "jampiroso",
		date: "12 Juli 2026",
		image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 2,
		title: "Hamparan Sawah & Bukit Dusun Karangtalun",
		desc: "Pemandangan pagi hari di hamparan persawahan hijau dengan latar belakang perbukitan yang sejuk.",
		category: "dusun",
		dusun: "karangtalun",
		date: "10 Juli 2026",
		image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 3,
		title: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)",
		desc: "Pertemuan rutin perangkat desa, tokoh masyarakat, dan perwakilan pemuda untuk menyusun program desa.",
		category: "kegiatan",
		dusun: "karangtalun",
		date: "5 Juli 2026",
		image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 4,
		title: "Panen Raya Padi Organik Kelompok Tani",
		desc: "Kegiatan panen padi bersama oleh kelompok tani di wilayah Dusun Baran dengan hasil gabah berkualitas tinggi.",
		category: "kegiatan",
		dusun: "baran",
		date: "28 Juni 2026",
		image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 5,
		title: "Jalan Setapak Asri Dusun Dangkel Kulon",
		desc: "Suasana asri jalan pedesaan yang dikelilingi pepohonan rindang dan kebun sayur milik warga lokal.",
		category: "dusun",
		dusun: "dangkel-kulon",
		date: "24 Juni 2026",
		image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 6,
		title: "Pelatihan Kewirausahaan & Pengolahan Hasil Tani UMKM",
		desc: "Ibu-ibu PKK dan pelaku UMKM mengikuti pelatihan pembuatan kripik dan pengemasan produk olahan lokal.",
		category: "kegiatan",
		dusun: "jambon",
		date: "20 Juni 2026",
		image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 7,
		title: "Posyandu Balita & Pemeriksaan Kesehatan Lansia",
		desc: "Layanan kesehatan berkala untuk memantau tumbuh kembang balita dan kesehatan lansia di Balai Dusun.",
		category: "kegiatan",
		dusun: "joho",
		date: "15 Juni 2026",
		image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 8,
		title: "Keindahan Matahari Terbenam di Embung Dusun Kajoran",
		desc: "Momen senja yang menenangkan di area penampungan air dan pertanian Dusun Kajoran.",
		category: "dusun",
		dusun: "kajoran",
		date: "12 Juni 2026",
		image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 9,
		title: "Aktivitas Budaya Seni Tradisional Karawitan",
		desc: "Latihan rutin grup karawitan dan kesenian lokal pemuda desa untuk melestarikan warisan budaya Jawa.",
		category: "kegiatan",
		dusun: "jangkang",
		date: "8 Juni 2026",
		image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 10,
		title: "Jembatan Penghubung & Sungai Bersih Dusun Selingan",
		desc: "Aliran sungai jernih yang menjadi sumber irigasi utama bagi lahan pertanian di sekitarnya.",
		category: "dusun",
		dusun: "selingan",
		date: "1 Juni 2026",
		image: "https://images.unsplash.com/photo-1432462770865-65b70566d673?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 11,
		title: "Kawasan Pemukiman Nyaman Dusun Dangkel Wetan",
		desc: "Tata rumah tinggal warga yang tertata rapi dengan pekarangan yang ditanami tanaman obat keluarga (TOGA).",
		category: "dusun",
		dusun: "dangkel-wetan",
		date: "25 Mei 2026",
		image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 12,
		title: "Pemerataan Infrastruktur Jalan Cor Dusun Jangkang A & B",
		desc: "Hasil pembangunan jalan rabat beton gotong royong yang memudahkan mobilitas hasil bumi warga.",
		category: "dusun",
		dusun: "jangkang-a",
		date: "18 Mei 2026",
		image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
	}
];
function GaleriOverview() {
	const [activeTab, setActiveTab] = useState("semua");
	const [selectedDusun, setSelectedDusun] = useState("semua");
	const [lightboxIndex, setLightboxIndex] = useState(null);
	const filteredList = useMemo(() => {
		return GALERI_DATA.filter((item) => {
			if (activeTab === "kegiatan" && item.category !== "kegiatan") return false;
			if (activeTab === "dusun" && item.category !== "dusun") return false;
			if (activeTab === "dusun" && selectedDusun !== "semua" && item.dusun !== selectedDusun) return false;
			return true;
		});
	}, [activeTab, selectedDusun]);
	const handleNext = useCallback(() => {
		if (lightboxIndex !== null) setLightboxIndex((prev) => (prev + 1) % filteredList.length);
	}, [lightboxIndex, filteredList.length]);
	const handlePrev = useCallback(() => {
		if (lightboxIndex !== null) setLightboxIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
	}, [lightboxIndex, filteredList.length]);
	useEffect(() => {
		if (lightboxIndex === null) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setLightboxIndex(null);
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		lightboxIndex,
		handleNext,
		handlePrev
	]);
	const currentItem = lightboxIndex !== null ? filteredList[lightboxIndex] : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "galeri-overview",
		children: [
			/* @__PURE__ */ jsx(SEO, {
				title: "Galeri Desa",
				description: "Dokumentasi foto kegiatan kemasyarakatan, pembangunan, dan potensi keindahan 12 dusun di Desa Karangtalun."
			}),
			/* @__PURE__ */ jsx(Header, {
				title: "Galeri & Dokumentasi",
				subtitle: "Potret Kehidupan, Kegiatan, dan Keindahan Alam Desa Karangtalun",
				green: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container galeri__content",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "galeri__filter-section",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "galeri__tabs",
						role: "tablist",
						children: [
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								role: "tab",
								"aria-selected": activeTab === "semua",
								className: `galeri__tab-btn ${activeTab === "semua" ? "galeri__tab-btn--active" : ""}`,
								onClick: () => {
									setActiveTab("semua");
									setSelectedDusun("semua");
								},
								children: [
									"Semua Foto (",
									GALERI_DATA.length,
									")"
								]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								role: "tab",
								"aria-selected": activeTab === "kegiatan",
								className: `galeri__tab-btn ${activeTab === "kegiatan" ? "galeri__tab-btn--active" : ""}`,
								onClick: () => setActiveTab("kegiatan"),
								children: [
									"Kegiatan Desa (",
									GALERI_DATA.filter((i) => i.category === "kegiatan").length,
									")"
								]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								role: "tab",
								"aria-selected": activeTab === "dusun",
								className: `galeri__tab-btn ${activeTab === "dusun" ? "galeri__tab-btn--active" : ""}`,
								onClick: () => setActiveTab("dusun"),
								children: [
									"Dokumentasi Dusun (",
									GALERI_DATA.filter((i) => i.category === "dusun").length,
									")"
								]
							})
						]
					}), activeTab === "dusun" && /* @__PURE__ */ jsxs("div", {
						className: "galeri__dusun-select-wrapper",
						children: [/* @__PURE__ */ jsx("span", {
							className: "galeri__dusun-label",
							children: "Pilih Wilayah:"
						}), /* @__PURE__ */ jsx("select", {
							className: "galeri__dusun-select",
							value: selectedDusun,
							onChange: (e) => setSelectedDusun(e.target.value),
							children: DUSUN_LIST.map((d) => /* @__PURE__ */ jsx("option", {
								value: d.slug,
								children: d.nama
							}, d.slug))
						})]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "galeri__grid",
					children: filteredList.length > 0 ? filteredList.map((item, index) => /* @__PURE__ */ jsxs("div", {
						className: "galeri-card",
						onClick: () => setLightboxIndex(index),
						role: "button",
						tabIndex: 0,
						"aria-label": `Lihat detail foto ${item.title}`,
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setLightboxIndex(index);
							}
						},
						children: [/* @__PURE__ */ jsx("img", {
							src: item.image,
							alt: item.title,
							className: "galeri-card__image",
							loading: "lazy"
						}), /* @__PURE__ */ jsxs("div", {
							className: "galeri-card__overlay",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: `galeri-card__badge ${item.category === "kegiatan" ? "galeri-card__badge--kegiatan" : "galeri-card__badge--dusun"}`,
									children: item.category === "kegiatan" ? "Kegiatan Desa" : `Dusun ${item.dusun.toUpperCase()}`
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "galeri-card__title",
									children: item.title
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "galeri-card__meta",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "galeri-card__date",
										children: ["📅 ", item.date]
									}), /* @__PURE__ */ jsx("span", {
										className: "galeri-card__zoom-icon",
										title: "Perbesar gambar",
										children: "🔍"
									})]
								})
							]
						})]
					}, item.id)) : /* @__PURE__ */ jsxs("div", {
						className: "galeri__empty",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "galeri__empty-icon",
								children: "📷"
							}),
							/* @__PURE__ */ jsx("h3", { children: "Belum Ada Dokumentasi" }),
							/* @__PURE__ */ jsx("p", { children: "Foto untuk filter yang Anda pilih saat ini sedang dalam persiapan." })
						]
					})
				})]
			}),
			currentItem && /* @__PURE__ */ jsx("div", {
				className: "galeri-lightbox",
				onClick: () => setLightboxIndex(null),
				role: "dialog",
				"aria-modal": "true",
				"aria-label": currentItem.title,
				children: /* @__PURE__ */ jsxs("div", {
					className: "galeri-lightbox__container",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "galeri-lightbox__btn-close",
							onClick: () => setLightboxIndex(null),
							title: "Tutup (Esc)",
							"aria-label": "Tutup modal",
							children: "×"
						}),
						filteredList.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "galeri-lightbox__nav galeri-lightbox__nav--prev",
							onClick: handlePrev,
							title: "Foto Sebelumnya (Panah Kiri)",
							"aria-label": "Foto sebelumnya",
							children: "‹"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "galeri-lightbox__nav galeri-lightbox__nav--next",
							onClick: handleNext,
							title: "Foto Berikutnya (Panah Kanan)",
							"aria-label": "Foto berikutnya",
							children: "›"
						})] }),
						/* @__PURE__ */ jsx("div", {
							className: "galeri-lightbox__image-wrapper",
							children: /* @__PURE__ */ jsx("img", {
								src: currentItem.image,
								alt: currentItem.title,
								className: "galeri-lightbox__image"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "galeri-lightbox__info",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "galeri-lightbox__title",
								children: currentItem.title
							}), /* @__PURE__ */ jsx("p", {
								className: "galeri-lightbox__desc",
								children: currentItem.desc
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "galeri-lightbox__meta-right",
								children: [/* @__PURE__ */ jsx("span", {
									className: `galeri-card__badge ${currentItem.category === "kegiatan" ? "galeri-card__badge--kegiatan" : "galeri-card__badge--dusun"}`,
									children: currentItem.category === "kegiatan" ? "Kegiatan Desa" : `Dusun ${currentItem.dusun.toUpperCase()}`
								}), /* @__PURE__ */ jsxs("span", {
									className: "galeri-card__date",
									style: { color: "#cbd5e1" },
									children: ["📅 ", currentItem.date]
								})]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes.jsx
/**
* routes.jsx — Definisi semua route dalam format data router (PRD §3)
*
* vite-react-ssg menggunakan react-router-dom createBrowserRouter secara internal,
* bukan <BrowserRouter>/<Routes>. Route didefinisikan sebagai array objek, bukan JSX.
*
* Cara menambah halaman baru:
* 1. Import komponen halaman di atas
* 2. Tambah objek { path, element } ke dalam array children di bawah
*/
function Placeholder({ title }) {
	return /* @__PURE__ */ jsxs("div", {
		style: {
			padding: "var(--spacing-section) var(--spacing-lg)",
			maxWidth: "var(--layout-max-width)",
			margin: "0 auto"
		},
		children: [/* @__PURE__ */ jsx("h1", {
			style: {
				color: "var(--color-text-primary)",
				marginBottom: "var(--spacing-md)"
			},
			children: title
		}), /* @__PURE__ */ jsx("p", {
			style: { color: "var(--color-text-muted)" },
			children: "Halaman ini sedang dalam pengembangan."
		})]
	});
}
//#endregion
//#region src/main.jsx
var createRoot = ViteReactSSG({ routes: [{
	element: /* @__PURE__ */ jsx(Layout, {}),
	children: [
		{
			index: true,
			element: /* @__PURE__ */ jsx(Beranda, {})
		},
		{
			path: "/profil-desa/overview",
			element: /* @__PURE__ */ jsx(Overview, {})
		},
		{
			path: "/profil-desa/dusun/:slug",
			element: /* @__PURE__ */ jsx(Dusun, {})
		},
		{
			path: "/pemerintahan/struktur-organisasi",
			element: /* @__PURE__ */ jsx(StrukturOrganisasi, {})
		},
		{
			path: "/pemerintahan/statistik-desa",
			element: /* @__PURE__ */ jsx(StatistikDesa, {})
		},
		{
			path: "/pemerintahan/statistik-dusun",
			element: /* @__PURE__ */ jsx(StatistikDusun, {})
		},
		{
			path: "/potensi-desa/overview",
			element: /* @__PURE__ */ jsx(Placeholder, { title: "Potensi Desa" })
		},
		{
			path: "/potensi-desa/umkm/:slug",
			element: /* @__PURE__ */ jsx(Placeholder, { title: "UMKM Dusun" })
		},
		{
			path: "/galeri/overview",
			element: /* @__PURE__ */ jsx(GaleriOverview, {})
		},
		{
			path: "/galeri/kegiatan-desa",
			element: /* @__PURE__ */ jsx(Placeholder, { title: "Galeri Kegiatan Desa" })
		},
		{
			path: "/galeri/dusun/:slug",
			element: /* @__PURE__ */ jsx(Placeholder, { title: "Dokumentasi Dusun" })
		},
		{
			path: "/peta-lokasi/peta-interaktif",
			element: /* @__PURE__ */ jsx(PetaInteraktif, {})
		},
		{
			path: "/peta-lokasi/fasilitas-umum",
			element: /* @__PURE__ */ jsx(Placeholder, { title: "Fasilitas Umum" })
		}
	]
}] });
//#endregion
export { createRoot };
