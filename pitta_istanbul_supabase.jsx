import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://cpeiszwucpcyvsrklmlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZWlzend1Y3BjeXZzcmtsbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODgyNzUsImV4cCI6MjA5MzE2NDI3NX0.89Nd63IZXSlQUJXlX-OiCZt7YPg6B0OkfkEawsmD85M";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const RESTAURANT = { name: "Pitta-Snack Istanbul", address: "Place Verte 17, 7370 Dour", phone: "+32 483 43 22 39" };
const R = "#C0392B";

const MENU = [
  { cat: "Menus", icon: "🎯", items: [
    { id: "m1", name: "Menu Grand Durum Pita", desc: "Grand durum + frites + boisson", price: 15.50 },
    { id: "m2", name: "Menu Tacos", desc: "Tacos + frites + boisson", price: 15.00 },
    { id: "m3", name: "Menu Petit Durum", desc: "Petit durum + frites + boisson", price: 12.50 },
    { id: "m4", name: "Menu Hamburger", desc: "Hamburger + frites + boisson", price: 10.00 },
  ]},
  { cat: "Menus Enfants", icon: "👶", items: [
    { id: "me1", name: "Menu Enfant Hamburger", desc: "Hamburger + frites + boisson", price: 12.50 },
    { id: "me2", name: "Menu Enfant Snack", desc: "Snack + frites + boisson", price: 12.00 },
    { id: "me3", name: "Menu Enfant Ravier Pita", desc: "Ravier pita + frites + boisson", price: 12.00 },
  ]},
  { cat: "Assiettes", icon: "🍽️", items: [
    { id: "a1", name: "Assiette du Chef", desc: "Boeuf grillé, frites, salade", price: 15.00 },
    { id: "a2", name: "Assiette Poulet", desc: "Poulet grillé, frites, salade", price: 15.00 },
    { id: "a3", name: "Assiette Hawaïenne", desc: "Avec ananas, frites, salade", price: 16.00 },
    { id: "a4", name: "Assiette Mexicaine", desc: "Maïs, piments, frites, salade", price: 17.00 },
    { id: "a5", name: "Assiette Mixte", desc: "Boeuf & poulet, frites, salade", price: 16.00 },
    { id: "a6", name: "Assiette Brochette Poulet", desc: "2 brochettes poulet, frites", price: 18.00 },
    { id: "a7", name: "Assiette Brochette Boeuf", desc: "2 brochettes boeuf, frites", price: 18.00 },
    { id: "a8", name: "Assiette Merguez", desc: "Merguez, frites, salade", price: 18.00 },
    { id: "a9", name: "Assiette Köfte", desc: "Köfte maison, frites, salade", price: 17.50 },
    { id: "a10", name: "Assiette Falafel", desc: "Falafels, frites, salade, sauce", price: 15.00 },
    { id: "a11", name: "Assiette Calamars", desc: "Calamars frits, frites, salade", price: 15.50 },
    { id: "a12", name: "Assiette Hamburger", desc: "Hamburger, frites, salade", price: 13.50 },
    { id: "a13", name: "Assiette du Patron", desc: "La spécialité maison", price: 20.00 },
  ]},
  { cat: "Kapsalons", icon: "🥗", items: [
    { id: "k1", name: "Kapsalon Boeuf", desc: "Frites, boeuf döner, salade, gouda fondu", price: 14.50 },
    { id: "k2", name: "Kapsalon Poulet", desc: "Frites, poulet döner, salade, gouda fondu", price: 14.50 },
    { id: "k3", name: "Kapsalon Mixte", desc: "Frites, mixte, salade, gouda fondu", price: 15.00 },
    { id: "k4", name: "Kapsalon Hamburger", desc: "Frites, hamburger, salade, gouda fondu", price: 14.00 },
    { id: "k5", name: "Kapsalon Mexicanos", desc: "Frites, mexicanos, salade, gouda fondu", price: 14.00 },
    { id: "k6", name: "Kapsalon Brochettes Poulet", desc: "Frites, brochettes poulet, salade", price: 15.00 },
    { id: "k7", name: "Kapsalon Brochettes Boeuf", desc: "Frites, brochettes boeuf, salade", price: 15.00 },
  ]},
  { cat: "Durums", icon: "🌯", items: [
    { id: "d1", name: "Durum du Chef", desc: "Boeuf döner, crudités, sauce maison", price: 10.00 },
    { id: "d2", name: "Durum Poulet", desc: "Poulet döner, crudités, sauce", price: 10.00 },
    { id: "d3", name: "Durum Mixte", desc: "Boeuf & poulet, crudités, sauce", price: 10.50 },
    { id: "d4", name: "Durum Hawaïen", desc: "Avec ananas, crudités, sauce", price: 12.00 },
    { id: "d5", name: "Durum Mexicain", desc: "Maïs, piments, crudités, sauce", price: 12.00 },
    { id: "d6", name: "Durum Végétarien", desc: "Légumes grillés, crudités, sauce", price: 10.00 },
    { id: "d7", name: "Durum Mulki", desc: "2 pièces, crudités, sauce", price: 11.00 },
    { id: "d8", name: "Durum Hamburger", desc: "Steak haché, crudités, sauce", price: 10.00 },
    { id: "d9", name: "Durum Köfte", desc: "Köfte maison, crudités, sauce", price: 12.00 },
    { id: "d10", name: "Durum Falafel", desc: "Falafels, crudités, sauce tahini", price: 11.00 },
    { id: "d11", name: "Durum Fricadelle", desc: "Fricadelle, crudités, sauce", price: 10.00 },
    { id: "d12", name: "Mega Durum", desc: "Le grand format, double garniture", price: 16.00 },
  ]},
  { cat: "Pains Pita", icon: "🥙", items: [
    { id: "pp1", name: "Pain Pita du Chef", desc: "Boeuf döner, crudités, sauce maison", price: 10.50 },
    { id: "pp2", name: "Pain Pita Poulet", desc: "Poulet döner, crudités, sauce", price: 10.50 },
    { id: "pp3", name: "Pain Pita Mixte", desc: "Boeuf & poulet, crudités, sauce", price: 10.50 },
    { id: "pp4", name: "Pain Pita Hawaïenne", desc: "Avec ananas, crudités, sauce", price: 11.00 },
    { id: "pp5", name: "Pain Pita Mexicaine", desc: "Maïs, piments, crudités, sauce", price: 11.00 },
    { id: "pp6", name: "Pain Pita Mulki", desc: "Garniture spéciale, crudités", price: 10.50 },
    { id: "pp7", name: "Pain Pita Hamburger", desc: "Steak haché, crudités, sauce", price: 10.00 },
    { id: "pp8", name: "Pain Pita Köfte", desc: "Köfte maison, crudités, sauce", price: 11.50 },
    { id: "pp9", name: "Pain Pita Falafel", desc: "Falafels, crudités, sauce tahini", price: 10.50 },
    { id: "pp10", name: "Pain Pita Végétarienne", desc: "Légumes grillés, crudités, sauce", price: 9.00 },
  ]},
  { cat: "Mitraillettes", icon: "🥖", items: [
    { id: "mi1", name: "Mitraillette Pitta Boeuf", desc: "Baguette, boeuf döner, frites", price: 11.50 },
    { id: "mi2", name: "Mitraillette Pitta Poulet", desc: "Baguette, poulet döner, frites", price: 11.50 },
    { id: "mi3", name: "Mitraillette Pitta Mixte", desc: "Baguette, mixte, frites", price: 11.50 },
    { id: "mi4", name: "Mitraillette Chasseur", desc: "Baguette, chasseur, frites", price: 12.00 },
    { id: "mi5", name: "Mitraillette Brochette Poulet", desc: "Baguette, brochette poulet, frites", price: 11.50 },
    { id: "mi6", name: "Mitraillette Brochette Boeuf", desc: "Baguette, brochette boeuf, frites", price: 13.00 },
    { id: "mi7", name: "Mitraillette Merguez", desc: "Baguette, merguez, frites", price: 13.00 },
    { id: "mi8", name: "Mitraillette Fricadelle", desc: "Baguette, fricadelle, frites", price: 10.00 },
    { id: "mi9", name: "Mitraillette Boulette", desc: "Baguette, boulette, frites", price: 11.00 },
    { id: "mi10", name: "Mitraillette Hamburger", desc: "Baguette, hamburger, frites", price: 11.00 },
  ]},
  { cat: "Tacos", icon: "🌮", items: [
    { id: "t1", name: "Tacos Viande", desc: "Galette, viande döner, sauce", price: 10.00 },
    { id: "t2", name: "Tacos Poulet", desc: "Galette, poulet döner, sauce", price: 10.00 },
    { id: "t3", name: "Tacos Mix", desc: "Galette, viande mixte, sauce", price: 11.00 },
    { id: "t4", name: "Tacos Köfte", desc: "Galette, köfte maison, sauce", price: 12.00 },
    { id: "t5", name: "Tacos Merguez", desc: "Galette, merguez, sauce", price: 12.00 },
    { id: "t6", name: "Tacos Tenders", desc: "Galette, tenders de poulet, sauce", price: 12.00 },
    { id: "t7", name: "Tacos Falafel", desc: "Galette, falafels, sauce tahini", price: 12.00 },
    { id: "t8", name: "Tacos Cordon-Bleu", desc: "Galette, cordon bleu, sauce", price: 13.00 },
    { id: "t9", name: "Tacos XL Cordons-Bleu", desc: "Format XL, double cordon bleu", price: 15.00 },
  ]},
  { cat: "Hamburgers", icon: "🍔", items: [
    { id: "h1", name: "Hamburger Classic", desc: "Steak boeuf, salade, tomate, cornichon", price: 5.00 },
    { id: "h2", name: "Cheeseburger", desc: "Steak boeuf, cheddar, sauce maison", price: 6.00 },
    { id: "h3", name: "Chicken Burger", desc: "Escalope de poulet, salade, mayo", price: 6.00 },
    { id: "h4", name: "Fish Burger", desc: "Poisson pané, salade, sauce tartare", price: 6.00 },
    { id: "h5", name: "Mulki Burger", desc: "Viande spéciale, sauce signature", price: 6.00 },
    { id: "h6", name: "Köfte Burger", desc: "Köfte maison, crudités, sauce", price: 6.50 },
    { id: "h7", name: "Double Burger", desc: "Double steak boeuf, double fromage", price: 7.00 },
    { id: "h8", name: "Géant Burger", desc: "Steak XXL, garniture complète", price: 6.50 },
  ]},
  { cat: "Snacks", icon: "🍗", items: [
    { id: "sn1", name: "Fricadelle", desc: "Saucisse de viande grillée", price: 3.50 },
    { id: "sn2", name: "Boulette", desc: "Boulette de viande sauce tomate", price: 3.50 },
    { id: "sn3", name: "Brochette de Poulet", desc: "1 brochette de poulet marinée", price: 6.00 },
    { id: "sn4", name: "Brochette de Boeuf", desc: "1 brochette de boeuf marinée", price: 6.00 },
    { id: "sn5", name: "Merguez", desc: "1 merguez grillée", price: 2.50 },
    { id: "sn6", name: "Köfte", desc: "1 köfte maison grillée", price: 2.50 },
    { id: "sn7", name: "Croquette de Fromage", desc: "Croquette fromage fondu", price: 3.00 },
    { id: "sn8", name: "Chicken Dips", desc: "5 pièces de poulet croustillant", price: 4.00 },
    { id: "sn9", name: "Nuggets", desc: "5 nuggets de poulet", price: 4.00 },
    { id: "sn10", name: "Tenders", desc: "3 tenders de poulet croustillants", price: 7.50 },
    { id: "sn11", name: "Mini Loempia", desc: "5 petits rouleaux de printemps", price: 4.00 },
    { id: "sn12", name: "Pilon", desc: "Pilon de poulet croustillant", price: 5.20 },
  ]},
  { cat: "Frites", icon: "🍟", items: [
    { id: "f1", name: "Frites Petite", desc: "Portion petite, frites maison", price: 4.00 },
    { id: "f2", name: "Frites Grande", desc: "Grande portion, frites maison", price: 4.50 },
  ]},
  { cat: "Sauces", icon: "🥣", items: [
    { id: "sa1", name: "Mayonnaise", desc: "", price: 1.00 },
    { id: "sa2", name: "Andalouse", desc: "Sauce tomate-mayo épicée", price: 1.00 },
    { id: "sa3", name: "Barbecue", desc: "Fumée et sucrée", price: 1.00 },
    { id: "sa4", name: "Samouraï", desc: "Piquante et fumée", price: 1.00 },
    { id: "sa5", name: "Cocktail", desc: "Rose crémeuse", price: 1.00 },
    { id: "sa6", name: "Sauce à l'Ail", desc: "Ail frais et crème", price: 1.00 },
    { id: "sa7", name: "Harissa", desc: "Piment rouge — très piquante", price: 1.00 },
    { id: "sa8", name: "Algérienne", desc: "Sauce épicée nord-africaine", price: 1.00 },
    { id: "sa9", name: "Tartare", desc: "Crème, cornichons, câpres", price: 1.00 },
    { id: "sa10", name: "Ketchup", desc: "", price: 1.00 },
  ]},
  { cat: "Boissons", icon: "🥤", items: [
    { id: "b1", name: "Coca-Cola 33cl", desc: "Canette froide", price: 2.70 },
    { id: "b2", name: "Coca-Cola Zero 33cl", desc: "Sans sucre", price: 2.70 },
    { id: "b3", name: "Fanta Orange 33cl", desc: "Canette froide", price: 2.50 },
    { id: "b4", name: "Sprite 33cl", desc: "Canette froide", price: 2.50 },
    { id: "b5", name: "Ice Tea 33cl", desc: "Thé glacé citron", price: 2.50 },
    { id: "b6", name: "Ayran", desc: "Boisson traditionnelle au yaourt", price: 2.00 },
    { id: "b7", name: "Red Bull 25cl", desc: "Boisson énergisante", price: 3.00 },
    { id: "b8", name: "Monster 25cl", desc: "Boisson énergisante", price: 3.50 },
    { id: "b9", name: "Coca-Cola 50cl", desc: "Grande bouteille", price: 4.00 },
    { id: "b10", name: "Eau minérale", desc: "Eau fraîche", price: 2.00 },
  ]},
];

const allItemsMap = {};
MENU.forEach(cat => cat.items.forEach(i => { allItemsMap[i.id] = i; }));

export default function App() {
  const [view, setView] = useState("client");
  const [activeCat, setActiveCat] = useState("Menus");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [note, setNote] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [tableNum] = useState(3);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const audioRef = useRef(null);

  // Load orders & subscribe to real-time
  useEffect(() => {
    if (view !== "staff") return;
    fetchOrders();
    const channel = supabase
      .channel("orders-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setOrders(prev => [payload.new, ...prev]);
          setNewOrderAlert(true);
          setTimeout(() => setNewOrderAlert(false), 4000);
        } else if (payload.eventType === "UPDATE") {
          setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
        } else if (payload.eventType === "DELETE") {
          setOrders(prev => prev.filter(o => o.id !== payload.old.id));
        }
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [view]);

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const cartTotal = () => Object.entries(cart).reduce((sum, [id, qty]) => sum + (allItemsMap[id]?.price || 0) * qty, 0);
  const cartCount = () => Object.values(cart).reduce((s, q) => s + q, 0);
  const addItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) => setCart(c => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });

  const submitOrder = async () => {
    setLoading(true);
    const items = Object.entries(cart).map(([id, qty]) => ({ id, qty }));
    const total = Math.round(cartTotal() * 100) / 100;
    const id = `CMD-${Date.now()}`;
    const { error } = await supabase.from("orders").insert([{
      id, table_num: tableNum, status: "nouveau", items, note, total
    }]);
    setLoading(false);
    if (!error) {
      setCart({});
      setNote("");
      setCartOpen(false);
      setOrdered(true);
    }
  };

  const updateStatus = async (orderId, status) => {
    await supabase.from("orders").update({ status }).eq("id", orderId);
  };

  const archiveOrder = async (orderId) => {
    await supabase.from("orders").delete().eq("id", orderId);
  };

  const currentCat = MENU.find(c => c.cat === activeCat);
  const filteredItems = search.trim()
    ? MENU.flatMap(c => c.items).filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    : currentCat?.items || [];

  const statusCounts = {
    nouveau: orders.filter(o => o.status === "nouveau").length,
    enCours: orders.filter(o => o.status === "en-cours").length,
    pret: orders.filter(o => o.status === "pret").length,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f4f0", minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>

      {/* TOP TOGGLE */}
      <div style={{ display: "flex", background: "#1a1a1a" }}>
        {["client", "staff"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1, padding: "13px 0", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: view === v ? R : "transparent", color: view === v ? "#fff" : "#888", transition: "all 0.2s",
          }}>
            {v === "client" ? "🍽️  Vue Client" : "📋  Dashboard Personnel"}
          </button>
        ))}
      </div>

      {/* NEW ORDER ALERT */}
      {newOrderAlert && (
        <div style={{ background: "#16a34a", color: "#fff", padding: "12px 16px", textAlign: "center", fontSize: 14, fontWeight: 700, animation: "slideDown 0.3s ease" }}>
          🔔 Nouvelle commande reçue !
        </div>
      )}

      {/* ===== CLIENT VIEW ===== */}
      {view === "client" && !ordered && (
        <div style={{ paddingBottom: 100 }}>
          {/* Hero */}
          <div style={{ background: `linear-gradient(135deg, #8B1A1A 0%, ${R} 60%, #D44000 100%)`, padding: "20px 16px 16px", color: "#fff" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.7, textTransform: "uppercase", marginBottom: 4 }}>Bienvenue chez</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Pitta-Snack Istanbul</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>Place Verte 17, 7370 Dour</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700 }}>🪑 Table {tableNum}</div>
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "5px 14px", fontSize: 12 }}>📞 0483 43 22 39</div>
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: "10px 12px", background: "#fff", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", alignItems: "center", background: "#f5f4f0", borderRadius: 10, padding: "8px 12px", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#999" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un plat..."
                style={{ border: "none", background: "none", outline: "none", flex: 1, fontSize: 14, color: "#333" }} />
              {search && <button onClick={() => setSearch("")} style={{ border: "none", background: "none", cursor: "pointer", color: "#999", fontSize: 18 }}>×</button>}
            </div>
          </div>

          {/* Categories */}
          {!search && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "10px 12px", background: "#fff", borderBottom: "1px solid #eee", scrollbarWidth: "none" }}>
              {MENU.map(c => (
                <button key={c.cat} onClick={() => setActiveCat(c.cat)} style={{
                  whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${activeCat === c.cat ? R : "#e5e7eb"}`,
                  background: activeCat === c.cat ? R : "#fff",
                  color: activeCat === c.cat ? "#fff" : "#555", cursor: "pointer", transition: "all 0.15s",
                }}>{c.icon} {c.cat}</button>
              ))}
            </div>
          )}

          {/* Section header */}
          {!search && currentCat && (
            <div style={{ padding: "14px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{currentCat.icon} {currentCat.cat}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{currentCat.items.length} articles</div>
            </div>
          )}
          {search && <div style={{ padding: "12px 16px 6px", fontSize: 13, color: "#888" }}>{filteredItems.length} résultat(s) pour « {search} »</div>}

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {filteredItems.map(item => {
              const qty = cart[item.id] || 0;
              return (
                <div key={item.id} style={{ background: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{item.name}</div>
                    {item.desc && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{item.desc}</div>}
                    <div style={{ fontSize: 15, fontWeight: 700, color: R, marginTop: 5 }}>{item.price.toFixed(2)} €</div>
                  </div>
                  {qty === 0 ? (
                    <button onClick={() => addItem(item.id)} style={{ width: 36, height: 36, borderRadius: "50%", background: R, border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => removeItem(item.id)} style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${R}`, background: "#fff", color: R, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 15, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
                      <button onClick={() => addItem(item.id)} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: R, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cart bar */}
          {cartCount() > 0 && (
            <div onClick={() => setCartOpen(true)} style={{
              position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
              width: "calc(100% - 32px)", maxWidth: 448,
              background: `linear-gradient(135deg, #8B1A1A, ${R})`,
              borderRadius: 14, padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", boxShadow: "0 4px 20px rgba(192,57,43,0.4)", zIndex: 50,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700, color: "#fff" }}>{cartCount()}</div>
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Voir le panier</span>
              </div>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{cartTotal().toFixed(2)} €</span>
            </div>
          )}

          {/* Cart modal */}
          {cartOpen && (
            <div onClick={e => { if (e.target === e.currentTarget) setCartOpen(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, padding: 20, maxHeight: "85vh", overflowY: "auto" }}>
                <div style={{ width: 40, height: 4, background: "#ddd", borderRadius: 2, margin: "0 auto 18px" }} />
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🛒 Votre commande — Table {tableNum}</div>
                {Object.entries(cart).map(([id, qty]) => {
                  const item = allItemsMap[id];
                  return item ? (
                    <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>x{qty} × {item.price.toFixed(2)} €</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => removeItem(id)} style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${R}`, background: "#fff", color: R, cursor: "pointer", fontSize: 14 }}>−</button>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{qty}</span>
                        <button onClick={() => addItem(id)} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: R, color: "#fff", cursor: "pointer", fontSize: 14 }}>+</button>
                        <span style={{ fontSize: 14, fontWeight: 700, color: R, minWidth: 50, textAlign: "right" }}>{(item.price * qty).toFixed(2)} €</span>
                      </div>
                    </div>
                  ) : null;
                })}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", fontWeight: 700, fontSize: 16, borderTop: "2px solid #1a1a1a", marginTop: 8 }}>
                  <span>Total</span><span style={{ color: R }}>{cartTotal().toFixed(2)} €</span>
                </div>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Remarques (allergies, cuisson, sans oignon...)" rows={2}
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, resize: "none", fontFamily: "inherit", outline: "none", marginBottom: 12, boxSizing: "border-box" }} />
                <button onClick={submitOrder} disabled={loading} style={{
                  width: "100%", background: loading ? "#ccc" : `linear-gradient(135deg, #8B1A1A, ${R})`,
                  color: "#fff", border: "none", borderRadius: 12, padding: 15, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                }}>
                  {loading ? "Envoi en cours..." : "Envoyer la commande →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUCCESS */}
      {view === "client" && ordered && (
        <div style={{ padding: 32, textAlign: "center", background: "#fff", minHeight: "calc(100vh - 46px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#16a34a", marginBottom: 10 }}>Commande envoyée !</div>
          <div style={{ fontSize: 15, color: "#666", marginBottom: 8 }}>Table {tableNum} — Commande bien reçue</div>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.6 }}>Notre équipe prépare votre repas.<br />Merci de patienter !</div>
          <button onClick={() => setOrdered(false)} style={{ background: R, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            + Nouvelle commande
          </button>
        </div>
      )}

      {/* ===== STAFF VIEW ===== */}
      {view === "staff" && (
        <div style={{ padding: 14, paddingBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>Commandes en cours</div>
              <div style={{ fontSize: 12, color: "#888" }}>Pitta-Snack Istanbul — Dour</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#16a34a", fontSize: 13, fontWeight: 600 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", animation: "pulse 1.5s infinite" }} />
              Live
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
            {[
              { label: "Nouvelles", count: statusCounts.nouveau, color: R, bg: "#fdecea" },
              { label: "En prép.", count: statusCounts.enCours, color: "#d97706", bg: "#fef3c7" },
              { label: "Prêtes", count: statusCounts.pret, color: "#16a34a", bg: "#dcfce7" },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.count}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: s.color, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Orders */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.length === 0 && (
              <div style={{ textAlign: "center", padding: 48, color: "#999" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🍽️</div>
                <div>Aucune commande pour l'instant</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Les commandes apparaîtront ici en temps réel</div>
              </div>
            )}
            {orders.map(order => {
              const borderColor = { nouveau: R, "en-cours": "#d97706", pret: "#16a34a" }[order.status] || "#ccc";
              const badge = {
                nouveau: { bg: "#fdecea", color: "#922b21", label: "🔴 Nouveau" },
                "en-cours": { bg: "#fef3c7", color: "#92400e", label: "🟡 En préparation" },
                pret: { bg: "#dcfce7", color: "#166534", label: "🟢 Prête" }
              }[order.status] || { bg: "#f0f0f0", color: "#666", label: order.status };
              return (
                <div key={order.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e5e7eb", borderLeft: `4px solid ${borderColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>Table {order.table_num} <span style={{ color: "#aaa", fontWeight: 400, fontSize: 12 }}>— {order.id.slice(-6)}</span></div>
                      <div style={{ fontSize: 12, color: "#888" }}>⏱ {new Date(order.created_at).toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                    <div style={{ background: badge.bg, color: badge.color, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{badge.label}</div>
                  </div>
                  <div style={{ padding: "10px 14px" }}>
                    {order.items.map((it, i) => {
                      const item = allItemsMap[it.id];
                      return item ? (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#333", padding: "2px 0" }}>
                          <span>{it.qty}× {item.name}</span>
                          <span style={{ color: "#888" }}>{(item.price * it.qty).toFixed(2)} €</span>
                        </div>
                      ) : null;
                    })}
                    {order.note && (
                      <div style={{ fontSize: 12, color: "#666", fontStyle: "italic", marginTop: 6, background: "#fffbeb", borderRadius: 6, padding: "4px 8px" }}>
                        💬 {order.note}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderTop: "1px solid #f0f0f0", background: "#fafafa" }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Total : {Number(order.total).toFixed(2)} €</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {order.status === "nouveau" && (
                        <button onClick={() => updateStatus(order.id, "en-cours")} style={{ background: "#d97706", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Accepter ✓</button>
                      )}
                      {order.status === "en-cours" && (
                        <button onClick={() => updateStatus(order.id, "pret")} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Prêt 🔔</button>
                      )}
                      {order.status === "pret" && (
                        <button onClick={() => archiveOrder(order.id)} style={{ background: "#6b7280", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Archiver</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideDown { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
