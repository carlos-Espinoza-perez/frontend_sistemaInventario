import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import AdditionalInformationDetails from "../../organisms/items/AdditionalInformationDetails";
import CardItemDetails from "../../organisms/items/CardItemDetails";

const ItemDetailsTemplate = () => {
  return (
    <>
      <HeaderActionBack title="Item Details" />
      <main className="p-4 min-h-[calc(100dvh-153px)] space-y-6">
        <CardItemDetails />
        <AdditionalInformationDetails />
      </main>

      <main className="sticky bottom-0 bg-[var(--surface-color)] border-t border-[var(--outline-variant)] p-4 rounded-t-lg">
        <div className="flex gap-3">
          <button className="flex flex-1 items-center justify-center rounded-full h-12 px-6 bg-[var(--secondary-color)] text-[var(--primary-color)] text-sm font-medium leading-normal tracking-wide hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50">
            <span className="material-icons mr-2">edit</span> Edit
          </button>
          <button className="flex flex-1 items-center justify-center rounded-full h-12 px-6 bg-[var(--primary-color)] text-white text-sm font-medium leading-normal tracking-wide hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50">
            <span className="material-icons mr-2">save</span> Save
          </button>
        </div>
      </main>
    </>
  );
};

export default ItemDetailsTemplate;