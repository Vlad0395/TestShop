<?php

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            [
                'id' => 1,
                'title' => 'Title 1',
                'about' =>
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto nobis corrupti repellendus reiciendis magnam
                    quasi molestiae veritatis?',
                'image' => '../images/image.png',
                'price' => 5,
            ],
            [
                'id' => 2,
                'title' => 'Title 2',
                'about' =>
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto nobis corrupti repellendus reiciendis magnam
                    quasi molestiae veritatis?',
                'image' => '../images/image.png',
                'price' => 2,
            ],
            [
                'id' => 3,
                'title' => 'Title 3',
                'about' =>
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto nobis corrupti repellendus reiciendis magnam
                    quasi molestiae veritatis?',
                'image' => '../images/image.png',
                'price' => 3,
            ]
        ]);
    }
}
