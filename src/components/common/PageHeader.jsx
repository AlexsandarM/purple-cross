function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="page-header" data-testid="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

export default PageHeader;
