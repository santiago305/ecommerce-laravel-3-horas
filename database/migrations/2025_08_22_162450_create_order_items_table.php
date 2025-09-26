<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        $uuidDefault = $this->uuidDefaultExpression();

        Schema::create('order_items', function (Blueprint $table) use ($uuidDefault) {
            $idColumn = $table->uuid('id');
            if ($uuidDefault) {
                $idColumn->default($uuidDefault);
            }
            $table->primary('id');
            $table->foreignUuid('order_id')
                ->constrained('orders')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignUuid('product_id')
                ->constrained('products')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('tax_rate', 5, 2)->default(18.00);
            $table->decimal('total_line', 10, 2);
            $table->timestamps();

            if (method_exists($table, 'check')) {
                $table->check('quantity > 0');
            }
        });
    }

    public function down(): void {
        Schema::dropIfExists('order_items');
    }

    private function uuidDefaultExpression(): ?Expression
    {
        return match (Schema::getConnection()->getDriverName()) {
            'pgsql' => DB::raw('gen_random_uuid()'),
            'mysql' => DB::raw('(UUID())'),
            default => null,
        };
    }
};
