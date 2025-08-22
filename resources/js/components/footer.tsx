import React from 'react';
export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                <h5 className="mb-3 text-sm font-semibold">Compañía</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Nosotros</a></li>
                <li><a href="#" className="hover:text-foreground">Trabaja con nosotros</a></li>
                </ul>
                </div>
                <div>
                <h5 className="mb-3 text-sm font-semibold">Ayuda</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Soporte</a></li>
                <li><a href="#" className="hover:text-foreground">Envíos y devoluciones</a></li>
                </ul>
                </div>
                <div>
                <h5 className="mb-3 text-sm font-semibold">Legal</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Términos</a></li>
                <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
                </ul>
                </div>
                <div>
                <h5 className="mb-3 text-sm font-semibold">Síguenos</h5>
                <div className="flex items-center gap-3">
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border">f</a>
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border">ig</a>
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border">yt</a>
                </div>
                </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
                <p>© {new Date().getFullYear()} MiTienda — Todos los derechos reservados.</p>
                <p>Hecho con ♥ en React + Tailwind</p>
                </div>
            </div>
        </footer>
    );
}
