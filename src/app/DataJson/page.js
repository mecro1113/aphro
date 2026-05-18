"use client";
import { useState, useRef } from "react";
import rawStudents from "../../utils/data.json";
import rawTeachers from "../../utils/teachers.json";

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
  return `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function ItemChip({ item }) {
  return (
    <div className="flex items-center gap-1.5 border border-white/10 px-2 py-1 text-xs text-white/40">
      <span className="text-white/30">{ITEM_ICONS[item.name] ?? null}</span>
      {item.name}
    </div>
  );
}

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

const initialStudents = rawStudents.map(p => ({
  ...p,
  image: dicebear(p.id === 2 ? `${p.firstname} 2` : p.firstname),
}));

const initialTeachers = rawTeachers.map(t => ({
  ...t,
  image: dicebear(t.name),
}));

/* ───────────── PAGE ───────────── */
export default function Page() {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [activeTab, setActiveTab] = useState("students");

  const [modal, setModal]           = useState(null);
  const [modalType, setModalType]   = useState("");
  const [draftItems, setDraftItems] = useState([]);

  const nextId = useRef(500);

  function openModal(person, type) {
    setModal(person);
    setModalType(type);
    setDraftItems(person.items ? person.items.map(i => ({ ...i })) : []);
  }

  function closeModal() {
    setModal(null);
    setDraftItems([]);
  }

  function addDraftItem(name) {
    setDraftItems(prev => [...prev, { id: nextId.current++, name }]);
  }

  function removeDraftItem(id) {
    setDraftItems(prev => prev.filter(i => i.id !== id));
  }

  function saveModal() {
    if (modalType === "teacher") {
      setTeachers(prev =>
        prev.map(t => t.id === modal.id ? { ...t, items: draftItems } : t)
      );
    }
    closeModal();
  }

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
              activeTab === tab
                ? "text-white border-b border-white pb-3 -mb-3"
                : "text-white/30 hover:text-white/60"
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
            <div
              key={s.id}
              className="border border-white/10 p-4 hover:border-white/25 transition-colors cursor-pointer"
              onClick={() => openModal(s, "student")}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={s.image}
                  alt={s.firstname}
                  className="w-10 h-10 rounded-full bg-white/5"
                />
                <div>
                  <h2 className="text-sm">{s.firstname} {s.lastname ?? ""}</h2>
                  {s.job && (
                    <p className="text-xs text-white/30">{s.job}</p>
                  )}
                </div>
              </div>
              {s.items?.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full bg-white/5"
                />
                <div>
                  <h2 className="text-sm">{t.name}</h2>
                  <p className="text-xs text-white/30">{t.role}</p>
                </div>
              </div>

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

            {/* Header with avatar */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={modal.image}
                alt={modalType === "student" ? modal.firstname : modal.name}
                className="w-12 h-12 rounded-full bg-white/5"
              />
              <div>
                <h2 className="text-sm">
                  {modalType === "student"
                    ? `${modal.firstname} ${modal.lastname ?? ""}`
                    : modal.name}
                </h2>
                {modalType === "teacher" && (
                  <p className="text-xs text-white/30">{modal.role}</p>
                )}
                {modalType === "student" && modal.job && (
                  <p className="text-xs text-white/30">{modal.job}</p>
                )}
              </div>
            </div>

            {/* ── STUDENT: read-only ── */}
            {modalType === "student" && modal.items && (
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Items</p>
                <div className="flex flex-wrap gap-2">
                  {modal.items.map(i => <ItemChip key={i.id} item={i} />)}
                </div>
              </div>
            )}

            {/* ── TEACHER: editable ── */}
            {modalType === "teacher" && (
              <>
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