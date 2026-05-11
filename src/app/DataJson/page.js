"use client";
import { useState, useRef } from "react";

const ITEM_ICONS = {
  Keyboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>
    </svg>
  ),
  Mouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="7" y="2" width="10" height="16" rx="5"/>
      <path d="M12 2v7M7 9h10"/>
    </svg>
  ),
  Monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Headphones: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <rect x="2" y="15" width="4" height="6" rx="2"/>
      <rect x="18" y="15" width="4" height="6" rx="2"/>
    </svg>
  ),
  Airpods: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M8 6a4 4 0 0 1 8 0v6H8V6z"/>
      <path d="M8 12v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/>
      <path d="M10 18v2M14 18v2"/>
    </svg>
  ),
};

const ALL_ITEM_NAMES = Object.keys(ITEM_ICONS);

function dicebear(seed) {
  return `https://api.dicebear.com/9.x/croodles/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

// ── Chip: read-only ──────────────────────────────────────
function ItemChip({ item }) {
  return (
    <div className="flex items-center gap-1.5 border border-white/10 px-2 py-1 text-xs text-white/40">
      <span className="text-white/30">{ITEM_ICONS[item.name] ?? null}</span>
      {item.name}
    </div>
  );
}

// ── Chip: removable (used inside modal) ──────────────────
function RemovableChip({ item, onRemove }) {
  return (
    <div className="flex items-center gap-1.5 border border-white/10 px-2 py-1 text-xs text-white/40">
      <span className="text-white/30">{ITEM_ICONS[item.name] ?? null}</span>
      {item.name}
      <button
        onClick={() => onRemove(item.id)}
        className="ml-1 text-white/20 hover:text-red-400 transition-colors leading-none"
        aria-label={`Remove ${item.name}`}
      >
        ×
      </button>
    </div>
  );
}

/* ───────────── DATA ───────────── */
const rawStudents = [
  {"id":1,"firstname":"Ананд","image":"https://i.pinimg.com/236x/64/11/9b/64119b15e41f962e266fdc7719d67929.jpg","lastname":"Амарзаяа","job":"developer","alive":true,"age":17,"email":"anand.amarzayaa@gmail.com","items":[{"id":10,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":11,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}],"height":185,"password":"Ананд123"},
  {"id":2,"firstname":"Ананд","image":"https://i.pinimg.com/236x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg","lastname":"Бамбацогт","job":"junior","alive":true,"age":17,"email":"anand.bambatsogt@gmail.com","items":[{"id":12,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":13,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}],"height":180,"password":"Ананд123"},
  {"id":3,"firstname":"Анхзаяа","image":"https://api.dicebear.com/9.x/croodles/svg?seed=Анхзаяа","lastname":"Пурэвсурэн","job":"designer","alive":true,"age":17,"email":"ankhzayaa.purevsuren@gmail.com","items":[{"id":14,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":15,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}],"height":165,"password":"Анхзаяа123"},
  {"id":4,"firstname":"Арвидах","image":"https://api.dicebear.com/9.x/croodles/svg?seed=Арвидах","lastname":"Пурэвдорж","job":"developer","alive":true,"age":17,"email":"arvidakh.purevdorj@gmail.com","items":[{"id":16,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":17,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}],"height":175,"password":"Арвидах123"},
  {"id":5,"firstname":"Ариунбаяр","items":[{"id":18,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":19,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":6,"firstname":"Батбилэг","items":[{"id":20,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":21,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":7,"firstname":"Золбоо","items":[{"id":22,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":23,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":8,"firstname":"Зоригт","items":[{"id":24,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":25,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}]},
  {"id":9,"firstname":"Маргад","items":[{"id":26,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":27,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":10,"firstname":"Мөнхболд","items":[{"id":28,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":29,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":11,"firstname":"Мөнхнар","items":[{"id":30,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":31,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":12,"firstname":"Мөнхчимэг","items":[{"id":32,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":33,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}]},
  {"id":13,"firstname":"Няндорж","items":[{"id":34,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":35,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":14,"firstname":"Нямрагчаа","items":[{"id":36,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":37,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":15,"firstname":"Пурэвбат","items":[{"id":38,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":39,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":16,"firstname":"Тэмүүлэн","items":[{"id":40,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":41,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}]},
  {"id":17,"firstname":"Тэнүүн","items":[{"id":42,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":43,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":18,"firstname":"Тэргэл","items":[{"id":44,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":45,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":19,"firstname":"Цолмон","items":[{"id":46,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":47,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":20,"firstname":"Цэлмүүн","items":[{"id":48,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":49,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}]},
  {"id":21,"firstname":"Цэлмэг","items":[{"id":50,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":51,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":22,"firstname":"Чингүн","items":[{"id":52,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":53,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":23,"firstname":"Энхбилэг","items":[{"id":54,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":55,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":24,"firstname":"Энхтүшиг","items":[{"id":56,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":57,"name":"Headphones","image":"https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/headsets/zone-wired-2/gallery/b2b-zone-wired2-business-headset-white-gallery1.png?v=1"}]},
  {"id":25,"firstname":"Эрхэмбилэг","items":[{"id":58,"name":"Keyboard","image":"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_UF894,1000_QL80_.jpg"},{"id":59,"name":"Mouse","image":"https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg"}]},
  {"id":26,"firstname":"Уранхишиг","items":[{"id":60,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":61,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]},
  {"id":27,"firstname":"Manlaibaatar","items":[{"id":62,"name":"Monitor","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFSI1RVx0O4g9zoZE3tlK-FWHs9kGaIhUHA&s"},{"id":63,"name":"Airpods","image":"https://cdnp.cody.mn/spree/images/1201001/large/1.jpg"}]}
];

const rawTeachers = [
  { "id": 1, "name": "Г. Дөл", "role": "English Teacher & College Counselor", "department": "Department of Social Sciences", "email": "dul@nhs.edu.mn", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%93.%20%D0%94%D3%A9%D0%BB&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Г. Дөл123" },
  { "id": 2, "name": "А. Жавзандулам", "role": "Literature Teacher", "department": "Department of Social Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%90.%20%D0%96%D0%B0%D0%B2%D0%B7%D0%B0%D0%BD%D0%B4%D1%83%D0%BB%D0%B0%D0%BC&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "А. Жавзандулам123" },
  { "id": 3, "name": "Г. Адьяахүү", "role": "Math Teacher", "department": "Department of Physical Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%93.%20%D0%90%D0%B4%D1%8C%D1%8F%D0%B0%D1%85%D2%AF%D2%AF&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Г. Адьяахүү123" },
  { "id": 4, "name": "Д. Ранцэнхорлоо", "role": "Math Teacher", "department": "Department of Physical Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%94.%20%D0%A0%D0%B0%D0%BD%D1%86%D1%8D%D0%BD%D1%85%D0%BE%D1%80%D0%BB%D0%BE%D0%BE&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Д. Ранцэнхорлоо123" },
  { "id": 5, "name": "Д. Оюунтуяа", "role": "Math Teacher", "department": "Department of Physical Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%94.%20%D0%9E%D1%8E%D1%83%D0%BD%D1%82%D1%83%D1%8F%D0%B0&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Д. Оюунтуяа123" },
  { "id": 6, "name": "М. Батхишиг", "role": "Chemistry Teacher", "department": "Department of Physical Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%9C.%20%D0%91%D0%B0%D1%82%D1%85%D0%B8%D1%88%D0%B8%D0%B3&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "М. Батхишиг123" },
  { "id": 7, "name": "С. Болдбаатар", "role": "Physics Teacher", "department": "Department of Physical Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%A1.%20%D0%91%D0%BE%D0%BB%D0%B4%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "С. Болдбаатар123" },
  { "id": 8, "name": "Лавениа", "role": "English Teacher", "department": "Department of Social Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%9B%D0%B0%D0%B2%D0%B5%D0%BD%D0%B8%D0%B0&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Лавениа123" },
  { "id": 9, "name": "Д. Мөнхбаатар", "role": "English Teacher", "department": "Department of Social Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%94.%20%D0%9C%D3%A9%D0%BD%D1%85%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Д. Мөнхбаатар123" },
  { "id": 10, "name": "Т. Лхагважаргал", "role": "English Teacher", "department": "Department of Social Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%A2.%20%D0%9B%D1%85%D0%B0%D0%B3%D0%B2%D0%B0%D0%B6%D0%B0%D1%80%D0%B3%D0%B0%D0%BB&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Т. Лхагважаргал123" },
  { "id": 11, "name": "Т. Чанцалням", "role": "Sociology Teacher", "department": "Department of Social Sciences", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%A2.%20%D0%A7%D0%B0%D0%BD%D1%86%D0%B0%D0%BB%D0%BD%D1%8F%D0%BC&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Т. Чанцалням123" },
  { "id": 12, "name": "О. Өсөхбаатар", "role": "IT Teacher", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%9E.%20%D3%A8%D1%81%D3%A9%D1%85%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "О. Өсөхбаатар123" },
  { "id": 13, "name": "Б. Бархасболд", "role": "IT Teacher", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%91.%20%D0%91%D0%B0%D1%80%D1%85%D0%B0%D1%81%D0%B1%D0%BE%D0%BB%D0%B4&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Б. Бархасболд123" },
  { "id": 14, "name": "С. Тэмүүжин", "role": "IT Developer", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%A1.%20%D0%A2%D1%8D%D0%BC%D2%AF%D2%AF%D0%B6%D0%B8%D0%BD&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "С. Тэмүүжин123" },
  { "id": 15, "name": "Э. Мөнх-Оргил", "role": "IT Teacher", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%AD.%20%D0%9C%D3%A9%D0%BD%D1%85-%D0%9E%D1%80%D0%B3%D0%B8%D0%BB&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Э. Мөнх-Оргил123" },
  { "id": 16, "name": "Б. Оргил", "role": "IT Developer", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%91.%20%D0%9E%D1%80%D0%B3%D0%B8%D0%BB&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Б. Оргил123" },
  { "id": 17, "name": "Н. Зөнбилэг", "role": "IT Developer", "department": "IT Department", "image": "https://api.dicebear.com/9.x/croodles/svg?seed=%D0%9D.%20%D0%97%D3%A9%D0%BD%D0%B1%D0%B8%D0%BB%D1%8D%D0%B3&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf", "password": "Н. Зөнбилэг123" }
];

const initialStudents = rawStudents.map(p => ({ ...p, image: dicebear(p.firstname) }));
const initialTeachers = rawTeachers.map(t => ({ ...t, image: dicebear(t.name) }));

/* ───────────── PAGE ───────────── */
export default function Page() {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [activeTab, setActiveTab] = useState("students");

  // Modal state
  const [modal, setModal]         = useState(null);   // the person being edited
  const [modalType, setModalType] = useState("");      // "student" | "teacher"
  const [draftItems, setDraftItems] = useState([]);   // editable copy of items

  const nextId = useRef(500);

  // ── Open modal ─────────────────────────────────────────
  function openModal(person, type) {
    setModal(person);
    setModalType(type);
    // Deep-copy so edits don't mutate until Save
    setDraftItems(person.items ? person.items.map(i => ({ ...i })) : []);
  }

  function closeModal() {
    setModal(null);
    setDraftItems([]);
  }

  // ── Draft item helpers (teacher modal only) ────────────
  function addDraftItem(name) {
    setDraftItems(prev => [...prev, { id: nextId.current++, name }]);
  }

  function removeDraftItem(id) {
    setDraftItems(prev => prev.filter(i => i.id !== id));
  }

  // ── Save ───────────────────────────────────────────────
  function saveModal() {
    if (modalType === "teacher") {
      setTeachers(prev =>
        prev.map(t => t.id === modal.id ? { ...t, items: draftItems } : t)
      );
    }
    // (Student editing not wired in this version — extend similarly if needed)
    closeModal();
  }

  // Items already assigned (to disable picker buttons for duplicates)
  const assignedNames = new Set(draftItems.map(i => i.name));

  return (
    <main className="min-h-screen bg-black text-white p-10 font-mono">

      {/* ── Tabs ── */}
      <div className="flex gap-6 mb-10 border-b border-white/10 pb-3">
        {["students", "teachers"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs uppercase tracking-widest transition-colors ${
              activeTab === tab ? "text-white border-b border-white pb-3 -mb-3" : "text-white/30 hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Students ── */}
      {activeTab === "students" && (
        <div className="grid md:grid-cols-3 gap-4">
          {students.map(s => (
            <div key={s.id} className="border border-white/10 p-4 hover:border-white/25 transition-colors">
              <h2 className="text-sm mb-1">{s.firstname} {s.lastname}</h2>
              {s.items?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {s.items.map(i => <ItemChip key={i.id} item={i} />)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Teachers ── */}
      {activeTab === "teachers" && (
        <div className="grid md:grid-cols-3 gap-4">
          {teachers.map(t => (
            <div key={t.id} className="border border-white/10 p-4 hover:border-white/25 transition-colors">
              <h2 className="text-sm mb-0.5">{t.name}</h2>
              <p className="text-xs text-white/30 mb-3">{t.role}</p>

              {t.items?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-3">
                  {t.items.map(i => <ItemChip key={i.id} item={i} />)}
                </div>
              ) : (
                <p className="text-xs text-white/20 italic mb-3">No items</p>
              )}

              <button
                onClick={() => openModal(t, "teacher")}
                className="text-xs uppercase tracking-widest border border-white/15 px-3 py-1.5 text-white/40 hover:text-white hover:border-white/50 transition-all"
              >
                Edit Items
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/15 p-6 w-96 max-h-[80vh] overflow-y-auto">

            {/* Header */}
            <h2 className="text-sm mb-0.5">
              {modalType === "student" ? `${modal.firstname} ${modal.lastname}` : modal.name}
            </h2>
            {modalType === "teacher" && (
              <p className="text-xs text-white/30 mb-4">{modal.role}</p>
            )}

            {/* ── STUDENT: read-only view ── */}
            {modalType === "student" && modal.items && (
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Items</p>
                <div className="flex flex-wrap gap-2">
                  {modal.items.map(i => <ItemChip key={i.id} item={i} />)}
                </div>
              </div>
            )}

            {/* ── TEACHER: editable items ── */}
            {modalType === "teacher" && (
              <>
                {/* Current assigned items */}
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Assigned Items</p>
                  {draftItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {draftItems.map(i => (
                        <RemovableChip key={i.id} item={i} onRemove={removeDraftItem} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white/20 italic">No items assigned</p>
                  )}
                </div>

                <hr className="border-white/8 my-4" />

                {/* Add item picker */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Add Item</p>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_ITEM_NAMES.map(name => (
                      <button
                        key={name}
                        onClick={() => addDraftItem(name)}
                        disabled={assignedNames.has(name)}
                        className={`flex items-center gap-2 border px-3 py-2 text-xs text-left transition-all ${
                          assignedNames.has(name)
                            ? "border-white/5 text-white/15 cursor-not-allowed"
                            : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        <span className="shrink-0">{ITEM_ICONS[name]}</span>
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="text-xs uppercase tracking-widest border border-white/15 px-4 py-1.5 text-white/40 hover:text-white hover:border-white/50 transition-all"
              >
                Cancel
              </button>
              {modalType === "teacher" && (
                <button
                  onClick={saveModal}
                  className="text-xs uppercase tracking-widest bg-white/90 hover:bg-white text-black px-4 py-1.5 transition-all"
                >
                  Save
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
