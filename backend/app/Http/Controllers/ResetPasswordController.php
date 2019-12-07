<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if(!$this->ValidateEmail($request->email))
        {
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email)
    {
        //check if there token
        $oldToken = DB::table('password_resets')->where('email',$email)->first();
        if($oldToken){
            return $oldToken;
        }

        //create new token
        $token = Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()

        ]);
    }

    public function ValidateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Email doesn\'t exist!'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset email is send successfully, please check your inbox'
        ], Response::HTTP_OK);
    }
}
