import { useState } from 'react'

export default function BrowsePage({ items, language }) {
  const [filterStatus, setFilterStatus] = useState([])
  const [filterCategory, setFilterCategory] = useState([])
  const [filterSearch, setFilterSearch] = useState("")

  const i18nName = (item) => {
    return language === "en" ? item.name : item.name_sv;
  }
  const i18nComments = (item) => {
    return language === "en" ? item.comments : item.comments_sv;
  }
  const i18nCategory = (item) => {
    if (language === "en") return item.category;
    switch (item.category) {
      case "Vegetables": return "Grönsaker";
      case "Fruit": return "Frukt";
      case "Grains": return "Spannmål";
      case "Dairy & Dairy alternatives": return "Mejeri & Mejerialternativ";
      case "Nuts, seeds & legumes": return "Nötter, frön & baljväxter";
      case "Sweeteners & confectionery": return "Sötningsmedel & Konfektyr";
      case "Condiments & spices": return "Kryddor & Smakämnen";
      case "Beverages": return "Drycker";
      default: return item.category;
    }
  }
  const i18nStatus = (status) => {
    if (language === "en") return status;
    switch (status) {
      case "green": return "Grön";
      case "yellow": return "Gul";
      case "red": return "Röd";
      default: return status;
    }
  }

  const filteredItems = items
    .toSorted((a, b) => i18nName(a).toLowerCase().localeCompare(i18nName(b).toLowerCase()))
    .filter((item) =>
      filterStatus.length > 0
        ? filterStatus.some((status) => item.status === status)
        : true
    )
    .filter((item) =>
      filterCategory.length > 0
        ? filterCategory.some((category) => i18nCategory(item) === category)
        : true
    )
    .filter((item) =>
      filterSearch
        ? (i18nName(item).toLowerCase().includes(filterSearch.toLowerCase())
          || (item.comments && i18nComments(item).toLowerCase().includes(filterSearch.toLowerCase())))
        : true
    )

  const statusFilterHandler = (event) => {
    if (event.target.checked) {
      setFilterStatus([...filterStatus, event.target.value])
    } else {
      setFilterStatus(
        filterStatus.filter((status) => status !== event.target.value)
      )
    }
  }

  const categoryFilterHandler = (event) => {
    if (event.target.checked) {
      setFilterCategory([...filterCategory, event.target.value])
    } else {
      setFilterCategory(
        filterCategory.filter((category) => category !== event.target.value)
      )
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 border border-neutral-300 rounded p-2">
        {[...new Set(items.map(i => i.status))].map((status) => (
          <label key={status}>
            <input
              type="checkbox"
              onChange={statusFilterHandler}
              value={status}
            />
            <span className={`status-${status}-bg px-2 py-1 rounded`}>
              {i18nStatus(status).charAt(0).toUpperCase() + i18nStatus(status).slice(1)}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border border-neutral-300 rounded p-2">
        {[...new Set(items.map(i => i18nCategory(i)))].map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              onChange={categoryFilterHandler}
              value={category}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="search"
          placeholder="Search items..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setFilterSearch(searchTerm);
          }}
        />
      </div>

      <div className="mt-4 flex flex-row flex-wrap gap-3 justify-between">
        {filteredItems.map((item, index) => (
          <div key={index} className={`relative p-2 pt-3 border rounded basis-full sm:basis-[49%] status-${item.status} shadow`}>
            <div className="absolute bottom-2 right-2 text-xs font-semibold">{i18nCategory(item)}</div>
            <div className={`absolute bottom-0 left-0 right-0 status-${item.status}-bg h-1 rounded-bl rounded-br block`}></div>
            <h2 className="font-semibold">{i18nName(item)}</h2>
            {item.portion_size && (
              <p>{item.portion_size}</p>
            )}
            {item.comments && (
              <p>({i18nComments(item)})</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
