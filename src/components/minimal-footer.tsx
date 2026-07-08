function MinimalFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-4">
      <p className="text-center text-sm text-bold">
        © {year} CV Analyzer AI - Créé par{" "}
        {/* Portfolio URL à ajouter une fois déployé */}
        <a href="#" className="underline-offset-4 hover:underline">
          Ambdulghaffar Ahamadi
        </a>
      </p>
    </footer>
  )
}

export { MinimalFooter }
