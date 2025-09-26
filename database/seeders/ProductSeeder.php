<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $products = [
            // Anillos
            ['name' => 'Anillo solitario oro 18k',         'description' => 'Anillo clásico con diamante central. Precio en soles (PEN).',          'price' => 1450.00, 'stock' => 12, 'is_active' => true],
            ['name' => 'Anillo compromiso plata zirconia', 'description' => 'Diseño elegante con piedra central. Precio en soles (PEN).',           'price' => 280.00,  'stock' => 25, 'is_active' => true],
            ['name' => 'Sortija oro rosa triple aro',      'description' => 'Tres bandas entrelazadas. Precio en soles (PEN).',                     'price' => 980.00,  'stock' => 8,  'is_active' => true],
            ['name' => 'Anillo caballero acero ónix',      'description' => 'Anillo robusto con piedra ónix. Precio en soles (PEN).',              'price' => 210.00,  'stock' => 18, 'is_active' => true],

            // Collares
            ['name' => 'Collar corazón oro amarillo',      'description' => 'Dije en forma de corazón. Precio en soles (PEN).',                   'price' => 750.00,  'stock' => 15, 'is_active' => true],
            ['name' => 'Cadena plata eslabón italiano',    'description' => 'Cadena de plata esterlina 925. Precio en soles (PEN).',              'price' => 320.00,  'stock' => 22, 'is_active' => true],
            ['name' => 'Collar perlas cultivadas 45 cm',   'description' => 'Perlas redondas con broche de plata. Precio en soles (PEN).',        'price' => 1350.00, 'stock' => 10, 'is_active' => true],
            ['name' => 'Gargantilla choker circonitas',    'description' => 'Brillo moderno para la noche. Precio en soles (PEN).',               'price' => 265.00,  'stock' => 30, 'is_active' => true],

            // Aretes
            ['name' => 'Aretes argolla oro 14k',           'description' => 'Argollas medianas con cierre seguro. Precio en soles (PEN).',       'price' => 540.00,  'stock' => 20, 'is_active' => true],
            ['name' => 'Aretes botón perla natural',       'description' => 'Perlas cultivadas con base de plata. Precio en soles (PEN).',        'price' => 360.00,  'stock' => 26, 'is_active' => true],
            ['name' => 'Aretes colgantes amatista',        'description' => 'Piedra amatista tallada. Precio en soles (PEN).',                    'price' => 295.00,  'stock' => 14, 'is_active' => true],
            ['name' => 'Ear cuff plata minimalista',       'description' => 'Aro ajustable sin perforación. Precio en soles (PEN).',              'price' => 110.00,  'stock' => 40, 'is_active' => true],

            // Pulseras
            ['name' => 'Pulsera tennis zirconias',         'description' => 'Pulsera flexible con zirconias brillantes. Precio en soles (PEN).',  'price' => 580.00,  'stock' => 16, 'is_active' => true],
            ['name' => 'Pulsera cuero trenzado acero',     'description' => 'Estilo urbano para caballero. Precio en soles (PEN).',               'price' => 160.00,  'stock' => 28, 'is_active' => true],
            ['name' => 'Brazalete oro blanco martillado',  'description' => 'Textura artesanal única. Precio en soles (PEN).',                    'price' => 1240.00, 'stock' => 7,  'is_active' => true],
            ['name' => 'Pulsera plata charms personalizable','description' => 'Incluye tres dijes temáticos. Precio en soles (PEN).',            'price' => 390.00,  'stock' => 19, 'is_active' => true],

            // Relojes
            ['name' => 'Reloj cuarzo acero dorado',        'description' => 'Caja de 36 mm resistente al agua. Precio en soles (PEN).',          'price' => 870.00,  'stock' => 9,  'is_active' => true],
            ['name' => 'Reloj automático correa cuero',    'description' => 'Movimiento visible y correa en piel. Precio en soles (PEN).',       'price' => 1580.00, 'stock' => 5,  'is_active' => true],
            ['name' => 'Reloj minimalista malla milanesa', 'description' => 'Diseño ultradelgado unisex. Precio en soles (PEN).',                'price' => 520.00,  'stock' => 13, 'is_active' => true],

            // Accesorios
            ['name' => 'Tobillera plata con dijes',        'description' => 'Dijes marinos en plata 925. Precio en soles (PEN).',                'price' => 180.00,  'stock' => 24, 'is_active' => true],
            ['name' => 'Broche pedrería vintage',          'description' => 'Broche estilo vintage con cristales. Precio en soles (PEN).',       'price' => 210.00,  'stock' => 17, 'is_active' => true],
            ['name' => 'Alfiler corbata acero negro',      'description' => 'Alfiler magnético para corbata. Precio en soles (PEN).',            'price' => 95.00,   'stock' => 35, 'is_active' => true],
            ['name' => 'Juego joyería oro laminado',       'description' => 'Incluye collar, aretes y pulsera. Precio en soles (PEN).',           'price' => 460.00,  'stock' => 12, 'is_active' => true],
        ];

        // Agrega timestamps para insert masivo
        $products = array_map(fn ($p) => array_merge($p, [
            'created_at' => $now,
            'updated_at' => $now,
        ]), $products);

        Product::insert($products);
    }
}