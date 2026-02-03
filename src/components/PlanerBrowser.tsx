export default function PlanerBrowser() {
return (
    <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
           { /*<p>Komponenta PlanerBrowser je ovde</p>*/}

           {/*Planeri*/ }
             <section className="flex-1">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div
                        key={2}
                        className="group relative overflow-hidden rounded-lg border border-gray-200"
                    >


                         <div className="p-4">
                            <p className="text-sm text-gray-500">
                                 Naziv planera
                            </p>
                        </div>
                     </div>
                 </div>
            </section>
        </div>
    </div>
);
}