<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if ($this->isPostgres()) {
            DB::statement('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
        }
    }

    public function down(): void
    {
        if ($this->isPostgres()) {
            DB::statement('DROP EXTENSION IF EXISTS "pgcrypto";');
        }
    }

    private function isPostgres(): bool
    {
        return Schema::getConnection()->getDriverName() === 'pgsql';
    }
};