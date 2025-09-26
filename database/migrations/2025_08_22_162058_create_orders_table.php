<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        $uuidDefault = $this->uuidDefaultExpression();

        Schema::create('orders', function (Blueprint $table) use ($uuidDefault) {
            $idColumn = $table->uuid('id');
            if ($uuidDefault) {
                $idColumn->default($uuidDefault);
            }
            $table->primary('id');
            $table->foreignUuid('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->enum('status', ['pending','paid','cancelled','refunded'])->default('pending');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2);
            $table->decimal('total', 10, 2);
            $table->string('payment_method', 30)->nullable();
            $table->string('payment_ref', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
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