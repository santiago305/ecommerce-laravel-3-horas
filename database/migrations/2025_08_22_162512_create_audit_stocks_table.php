<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        $uuidDefault = $this->uuidDefaultExpression();

        Schema::create('audit_stocks', function (Blueprint $table) use ($uuidDefault) {
            $idColumn = $table->uuid('id');
            if ($uuidDefault) {
                $idColumn->default($uuidDefault);
            }
            $table->primary('id');
            $table->foreignUuid('product_id')
                ->constrained('products')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->integer('change');
            $table->enum('reason', ['order','manual','return'])->default('order');
            $table->foreignUuid('order_id')
                ->nullable()
                ->constrained('orders')
                ->onUpdate('cascade')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('audit_stocks');
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