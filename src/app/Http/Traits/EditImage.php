<?php
namespace App\Http\Traits;
use Intervention\Image\Facades\Image;

trait EditImage {

    //画像をリサイズ
    public static function ResizeImage($file)
    {
        # png形式に変換し保存する(透過png対策)
        $image = Image::make($file);
        $image->resize(368,554);
        $image->stream('png');

        return "data:image/png;base64,".base64_encode($image);

    }

    //追加したスタンプをリサイズ
    public static function ResizeStamp($file)
    {
        # png形式に変換し保存する(透過png対策)
        $image = Image::make($file);
        $image->resize(365,400);
        $image->stream('png');

        return "data:image/png;base64,".base64_encode($image);

    }
}