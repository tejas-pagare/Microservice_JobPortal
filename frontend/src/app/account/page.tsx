"use client";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React, { useEffect } from "react";
import Info from "./components/info";
import Skills from "./components/skills";
import Company from "./components/company";
import { useRouter } from "next/navigation";
import AppliedJobs from "./components/appliedJobs";
import MyBlogs from "./components/MyBlogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountPage = () => {
  const { isAuth, user, loading, applications } = useAppData();

  const router = useRouter();

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  if (loading) return <Loading />;
  return (
    <>
      {user && (
        <div className="w-[90%] md:w-[60%] m-auto">
          <Info user={user} isYourAccount={true} />
          {user.role === "jobseeker" && (
            <Skills user={user} isYourAccount={true} />
          )}
          {user.role === "jobseeker" && (
            <AppliedJobs applications={applications} />
          )}
          {user.role === "recruiter" && (
            <div className="mt-6">
              <Tabs defaultValue="companies" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="companies">My Companies</TabsTrigger>
                  <TabsTrigger value="blogs">My Blogs</TabsTrigger>
                </TabsList>
                <TabsContent value="companies">
                  <Company />
                </TabsContent>
                <TabsContent value="blogs">
                  <MyBlogs />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AccountPage;
