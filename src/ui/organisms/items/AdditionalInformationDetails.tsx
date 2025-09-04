const AdditionalInformationDetails = () => {
  return (
    <section>
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3 px-1">
        Additional Information
      </h3>
      <div className="bg-[var(--surface-color)] rounded-xl shadow-md divide-y divide-[var(--outline-variant)]">
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150">
          <div className="flex items-center">
            <span className="material-icons-outlined text-[var(--text-secondary)] mr-3">
              category
            </span>
            <p className="text-sm text-[var(--text-secondary)]">Category</p>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Electronics
          </p>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150">
          <div className="flex items-center">
            <span className="material-icons-outlined text-[var(--text-secondary)] mr-3">
              local_shipping
            </span>
            <p className="text-sm text-[var(--text-secondary)]">Supplier</p>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Tech Solutions Inc.
          </p>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150">
          <div className="flex items-center">
            <span className="material-icons-outlined text-[var(--text-secondary)] mr-3">
              date_range
            </span>
            <p className="text-sm text-[var(--text-secondary)]">Last Stocked</p>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            2023-10-26
          </p>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150">
          <div className="flex items-center">
            <span className="material-icons-outlined text-[var(--text-secondary)] mr-3">
              qr_code_scanner
            </span>
            <p className="text-sm text-[var(--text-secondary)]">Barcode</p>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            9876543210123
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdditionalInformationDetails;