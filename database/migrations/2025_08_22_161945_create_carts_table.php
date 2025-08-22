<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        Schema::create('carts', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->enum('status', ['active','checked_out','abandoned'])->default('active');
            $table->timestamps();
        });

        DB::statement("CREATE UNIQUE INDEX carts_user_active_unique ON carts (user_id) WHERE status = 'active';");
    }

    public function down(): void {
        DB::statement("DROP INDEX IF EXISTS carts_user_active_unique;");
        Schema::dropIfExists('carts');
    }
};
