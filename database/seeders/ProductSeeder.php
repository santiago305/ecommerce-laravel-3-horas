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
            // Bebidas
            ['name' => 'Agua sin gas 600 ml',     'description' => 'Agua de mesa. Precio en soles (PEN).',         'price' => 2.50,  'stock' => 200, 'is_active' => true],
            ['name' => 'Agua sin gas 1.5 L',      'description' => 'Botella familiar. Precio en soles (PEN).',     'price' => 4.50,  'stock' => 150, 'is_active' => true],
            ['name' => 'Gaseosa sabor cola 500 ml','description' => 'Bebida gaseosa. Precio en soles (PEN).',      'price' => 4.00,  'stock' => 120, 'is_active' => true],
            ['name' => 'Gaseosa sabor cola 1.5 L','description' => 'Ideal para compartir. Precio en soles (PEN).', 'price' => 8.50,  'stock' => 90,  'is_active' => true],
            ['name' => 'Jugo de naranja 1 L',     'description' => 'Néctar de fruta. Precio en soles (PEN).',      'price' => 8.90,  'stock' => 80,  'is_active' => true],
            ['name' => 'Bebida energizante 473 ml','description' => 'Energía al instante. Precio en soles (PEN).', 'price' => 7.50,  'stock' => 60,  'is_active' => true],

            // Snacks / Chocolates / Galletas
            ['name' => 'Chocolate con leche 35 g','description' => 'Tableta clásica. Precio en soles (PEN).',       'price' => 2.20,  'stock' => 300, 'is_active' => true],
            ['name' => 'Chocolate bitter 90 g',   'description' => 'Alto cacao. Precio en soles (PEN).',           'price' => 6.50,  'stock' => 140, 'is_active' => true],
            ['name' => 'Barra de cereal 25 g',    'description' => 'Snack práctico. Precio en soles (PEN).',       'price' => 2.80,  'stock' => 220, 'is_active' => true],
            ['name' => 'Papas fritas 150 g',      'description' => 'Crocantes. Precio en soles (PEN).',            'price' => 6.90,  'stock' => 110, 'is_active' => true],
            ['name' => 'Maní salado 120 g',       'description' => 'Fuente de energía. Precio en soles (PEN).',    'price' => 5.20,  'stock' => 130, 'is_active' => true],
            ['name' => 'Galletas de vainilla 6 un','description' => 'Dulces y ligeras. Precio en soles (PEN).',    'price' => 3.40,  'stock' => 180, 'is_active' => true],
            ['name' => 'Galletas de chocolate 6 un','description' => 'Relleno cremoso. Precio en soles (PEN).',    'price' => 3.50,  'stock' => 170, 'is_active' => true],

            // Abarrotes
            ['name' => 'Arroz superior 1 kg',     'description' => 'Grano largo. Precio en soles (PEN).',          'price' => 4.80,  'stock' => 200, 'is_active' => true],
            ['name' => 'Azúcar rubia 1 kg',       'description' => 'Dulzor natural. Precio en soles (PEN).',       'price' => 4.50,  'stock' => 180, 'is_active' => true],
            ['name' => 'Fideos spaghetti 500 g',  'description' => 'Sémola de trigo. Precio en soles (PEN).',      'price' => 3.80,  'stock' => 160, 'is_active' => true],
            ['name' => 'Aceite vegetal 1 L',      'description' => 'Cocina diaria. Precio en soles (PEN).',        'price' => 13.90, 'stock' => 120, 'is_active' => true],
            ['name' => 'Atún en agua 170 g',      'description' => 'Listo para comer. Precio en soles (PEN).',     'price' => 6.20,  'stock' => 140, 'is_active' => true],
            ['name' => 'Leche evaporada 400 g',   'description' => 'Para postres y café. Precio en soles (PEN).',  'price' => 4.50,  'stock' => 190, 'is_active' => true],
            ['name' => 'Pan de molde 550 g',      'description' => 'Rebanadas suaves. Precio en soles (PEN).',     'price' => 7.90,  'stock' => 90,  'is_active' => true],

            // Lácteos
            ['name' => 'Yogur fresa 1 L',         'description' => 'Cremoso y delicioso. Precio en soles (PEN).',  'price' => 9.50,  'stock' => 100, 'is_active' => true],
            ['name' => 'Queso fresco 250 g',      'description' => 'Ideal para desayunos. Precio en soles (PEN).', 'price' => 8.90,  'stock' => 70,  'is_active' => true],

            // Limpieza
            ['name' => 'Detergente en polvo 800 g','description' => 'Ropa limpia. Precio en soles (PEN).',         'price' => 12.50, 'stock' => 85,  'is_active' => true],
            ['name' => 'Lavavajillas 500 ml',     'description' => 'Desengrasa rápido. Precio en soles (PEN).',    'price' => 6.90,  'stock' => 95,  'is_active' => true],
            ['name' => 'Papel higiénico pack x4', 'description' => 'Suave y rendidor. Precio en soles (PEN).',     'price' => 9.90,  'stock' => 150, 'is_active' => true],

            // Cuidado personal
            ['name' => 'Shampoo 400 ml',          'description' => 'Brillo y suavidad. Precio en soles (PEN).',    'price' => 17.90, 'stock' => 60,  'is_active' => true],
            ['name' => 'Jabón de tocador x3',     'description' => 'Fragancia fresca. Precio en soles (PEN).',     'price' => 6.50,  'stock' => 140, 'is_active' => true],
            ['name' => 'Pasta dental 90 g',       'description' => 'Protección completa. Precio en soles (PEN).',  'price' => 8.90,  'stock' => 120, 'is_active' => true],
        ];

        // Agrega timestamps para insert masivo
        $products = array_map(fn ($p) => array_merge($p, [
            'created_at' => $now,
            'updated_at' => $now,
        ]), $products);

        Product::insert($products);
    }
}
