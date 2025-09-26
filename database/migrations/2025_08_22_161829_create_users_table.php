<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB; // 👈 necesario para DB::raw()
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // USERS con UUID + role
        $uuidDefault = $this->uuidDefaultExpression();

        Schema::create('users', function (Blueprint $table) use ($uuidDefault) {
            $idColumn = $table->uuid('id');
            if ($uuidDefault) {
                $idColumn->default($uuidDefault);
            }
            $table->primary('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->enum('role', ['admin','user'])->default('user'); // si usas roles
            $table->timestamps();
        });

        // Password reset tokens (igual que por defecto)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Sessions → user_id como UUID (sin FK, igual que el default pero tipado)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->uuid('user_id')->nullable()->index(); // 👈 UUID, no foreignId()
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
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