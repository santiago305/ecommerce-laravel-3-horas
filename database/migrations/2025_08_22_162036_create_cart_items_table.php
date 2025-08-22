<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('cart_id')
                ->constrained('carts')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignUuid('product_id')
                ->constrained('products')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->integer('quantity'); 
            $table->timestamps();

            $table->unique(['cart_id','product_id']);
        });

        DB::statement("ALTER TABLE cart_items ADD CONSTRAINT cart_items_quantity_positive CHECK (quantity > 0);");
    }

    public function down(): void {
        Schema::dropIfExists('cart_items');
    }
};
