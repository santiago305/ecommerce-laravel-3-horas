<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        $uuidDefault = $this->uuidDefaultExpression();

        Schema::create('cart_items', function (Blueprint $table) use ($uuidDefault) {
            $idColumn = $table->uuid('id');
            if ($uuidDefault) {
                $idColumn->default($uuidDefault);
            }
            $table->primary('id');
            $table->foreignUuid('cart_id')
                ->constrained('carts')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignUuid('product_id')
                ->constrained('products')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->unsignedInteger('quantity');
            $table->timestamps();

            $table->unique(['cart_id','product_id']);
            $table->check('quantity > 0');
        });
    }

    public function down(): void {
        Schema::dropIfExists('cart_items');
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